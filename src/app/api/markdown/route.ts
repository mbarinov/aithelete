import prisma from "@/prisma";
import { type NextRequest } from 'next/server'


export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
        return Response.json({error: 'Invalid data format or other error'}, {status: 400});
    }

    const payload = await prisma.trainingProgram.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            programName: true,
            programDescription: true,
            createdAt: true,
            exercises: {
                select: {
                    id: true,
                    workoutName: true,
                    workoutDescription: true,
                    duration: true,
                    caloriesBurned: true,
                    exercises: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            category: true,
                            muscleGroupCount: true,
                            sets: true,
                            reps: true,
                            weightAmount: true,
                            weightUnit: true,
                            assistWeightAmount: true,
                            assistWeightUnit: true,
                            duration: true,
                        }
                    }
                }
            }
        }
    });


    try {
        const programName = payload?.programName;

        const programSection = `
## ${programName}
    `;

        const workoutSections = payload?.exercises.map((workout, index) => {
            const exerciseList = workout.exercises
                .map(
                    (exercise) => `
- **${exercise.name}**: ${exercise.sets} sets x ${exercise.reps} reps${exercise.weightAmount ? ` @ ${exercise.weightAmount} ${exercise.weightUnit}` : ''}
    `
                )
                .join('');

            return `
### Day ${index + 1}: ${workout.workoutName}

${exerciseList}
    `;
        });

        const markdown = `${programSection}\n\n${workoutSections?.join('\n')}`;

        return Response.json({markdown});
    } catch (error) {
        return Response.json({error: 'Invalid data format or other error'}, {status: 400});
    }
}