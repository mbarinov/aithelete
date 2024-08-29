import {streamObject} from "ai";
import {openai} from "@ai-sdk/openai";
import {auth} from "@/auth"
import {TrainingProgramSchema, ExerciseEnum, EquipmentEnum} from "@/lib/schema"
import prisma from "@/prisma";

export const maxDuration = 60;

export async function POST(req: Request) {
    const session = await auth();

    if (!session) {
        return new Response("Unauthorized", {status: 401});
    }

    console.log('Session:', session);

    const {age, sex, height, weight, fitnessLevel} = await req.json();

    const availableExercises = ExerciseEnum.options.join(", ");
    const availableEquipment = EquipmentEnum.options.join(", ");

    const prompt = `
    Generate a personalized 3-day split training program for a ${age}-year-old ${sex}, ${height} cm tall, weighing ${weight} kg, at a ${fitnessLevel} fitness level. The program should be well-structured, targeting specific muscle groups each day to ensure balanced development and adequate recovery.

    **Adaptation Requirements:**
1. The exercises should be tailored to the fitness level of a ${fitnessLevel}, offering appropriate challenges without risk of overtraining.
2. Consider the individual’s body dimensions, gender and weight in the selection of exercises and recommended weights.
3. Ensure the program is using of the available equipment and exercises listed below, avoiding any not included in the provided list.
`;


    const system = `
You are a professional fitness trainer responsible for creating personalized workout plans.

Requirements:

Split Focus: Design a 3-day split workout program, each day focusing on different major muscle groups or combinations (e.g., Chest/Triceps, Back/Biceps, Legs/Shoulders). Ensure no significant overlap in targeted muscle groups on consecutive days to allow for optimal recovery.

Exercise Structure: Each workout day should include 4 to 8 exercises selected from the provided list. Specify:

The name of each exercise.
The number of sets and repetitions.
The recommended weight (in kg), adapted to the individual's fitness level and goals.
Workout Day Details:

Provide a unique and descriptive name for each workout day that reflects the targeted muscle group(s).
Include a brief description (2-3 sentences) summarizing the goals and key features of the workout, emphasizing the intended outcomes (e.g., strength, toning, endurance).
Available Exercises and Equipment: Use only the exercises and equipment listed below. Do NOT include any exercises or equipment not listed:

Exercises: ${availableExercises}.

Equipment: ${availableEquipment}.

Fitness Level Definitions and Training Experience:

Beginner (0-3 months): Focus on foundational strength, proper form, and muscular endurance. Use lighter weights and low-intensity exercises to prevent overtraining.
Intermediate (6-12 months): Increase strength, muscle tone, and stamina. Use moderate weights with a mix of compound and isolation exercises, incorporating moderate rest periods.
Advanced (12+ months): Focus on hypertrophy, maximum strength, and muscle definition. Use heavier weights with complex movements for increased intensity.
  `;

    const result = await streamObject({
        model: openai("gpt-4o-mini"),
        schema: TrainingProgramSchema,
        schemaName: "Personalized Training Program",
        schemaDescription: "A personalized 3-day split training program",
        prompt,
        system,
        mode: 'json',
        maxRetries: 3,
        async onFinish({object, error}) {
            if (object === undefined) {
                console.error('Error:', error);
                return;
            }


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

            const {metadata, exercises} = object;

            const exerciseData = exercises.map(workout => ({
                day: workout.day,
                workoutName: workout.workoutName,
                workoutDescription: workout.workoutDescription,
                duration: workout.duration,
                caloriesBurned: workout.caloriesBurned,
                exercises: {
                    create: workout.workout.map(exercise => ({
                        name: exercise.name,
                        description: exercise.description,
                        category: exercise.category,
                        muscleGroupCount: exercise.muscleGroupCount,
                        sets: exercise.sets,
                        reps: exercise.reps,
                        weightAmount: exercise.weight ? exercise.weight.amount : null,
                        weightUnit: exercise.weight ? exercise.weight.unit : null,
                        duration: exercise.duration || null,
                    })),
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
        },
    });

    return result.toTextStreamResponse();
}
