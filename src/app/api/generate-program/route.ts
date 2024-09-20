import {auth} from "@/auth"
import {
    TrainingProgramSchema,
    ExerciseEnum,
    EquipmentEnum,
    TrainingProgramType
} from "@/lib/schema"
import prisma from "@/prisma";
import {
    getIllustrationsByExercise
} from "@/app/api/generate-program/illustrations";
import {createAgent} from "@/lib/agent";

export const maxDuration = 60;

export async function POST(req: Request) {
    const session = await auth();

    if (!session) {
        return new Response("Unauthorized", {status: 401});
    }

    const {age, gender, height, weight, fitnessLevel} = await req.json();

    const availableExercises = ExerciseEnum.options.join(", ");
    const availableEquipment = EquipmentEnum.options.join(", ");

    const agent = createAgent();
    const stream = await agent.invoke({
        age,
        gender,
        height,
        weight,
        fitnessLevel,
        availableExercises,
        availableEquipment,
    });

    const object = stream.result;

    if (!session.user?.email) {
        throw new Error("User not found");
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    const {metadata, exercises} = object as TrainingProgramType;

            const exerciseData = exercises.map(workout => ({
                day: workout.day,
                workoutName: workout.workoutName,
                workoutDescription: workout.workoutDescription,
                duration: workout.duration,
                caloriesBurned: workout.caloriesBurned,
                exercises: {
                    create: workout.workout.map(exercise => {
                        const illustrations = getIllustrationsByExercise(exercise.name);

                return {
                    name: exercise.name,
                    illustrations: {
                        create: illustrations.map(illustration => ({
                            url: illustration,
                        }))
                    },
                    description: exercise.description,
                    category: exercise.category,
                    muscleGroupCount: exercise.muscleGroupCount,
                    sets: exercise.sets,
                    reps: exercise.reps,
                    weightAmount: exercise.weight ? exercise.weight.amount : null,
                    weightUnit: exercise.weight ? exercise.weight.unit : null,
                    duration: 60,
                }
            }),
        },
    }))

    await prisma.trainingProgram.upsert({
        where: {
            userId: user.id,
        },
        update: {
            programName: metadata.programName,
            programDescription: metadata.programDescription,
            exercises: {
                deleteMany: {}, // Clear existing workouts and exercises first
                create: exerciseData,
            },
        },
        create: {
            programName: metadata.programName,
            programDescription: metadata.programDescription,
            user: {
                connect: {id: user.id},
            },
            exercises: {
                create: exerciseData,
            },
        },
    });

    await prisma.userProfile.upsert({
        where: {
            userId: user.id,
        },
        update: {
            age: object.metadata.personalInfo.age,
            weight: object.metadata.personalInfo.weight,
            height: object.metadata.personalInfo.height,
            gender: object.metadata.personalInfo.gender,
            fitnessLevel: object.metadata.personalInfo.fitnessLevel,
        },
        create: {
            userId: user.id,
            age: object.metadata.personalInfo.age,
            weight: object.metadata.personalInfo.weight,
            height: object.metadata.personalInfo.height,
            gender: object.metadata.personalInfo.gender,
            fitnessLevel: object.metadata.personalInfo.fitnessLevel,
        }
    });

    return new Response(JSON.stringify(object), {
        status: 200, headers: {
            "Content-Type": "application/json",
        }
    });
}
