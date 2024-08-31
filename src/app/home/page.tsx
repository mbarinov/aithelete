import {redirect} from 'next/navigation';
import {auth} from "@/auth";
import prisma from "@/prisma";

import { HomeClient} from "@/app/home/client";

export default async function HomePage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect("/login");
    }

    const payload = await prisma.user.findUnique({
        where: {
            email: session.user.email
        },
        select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
            profile: {
                select: {
                    age: true,
                    weight: true,
                    height: true,
                    fitnessLevel: true,
                    gender: true,
                }
            },
            trainingProgram: {
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
            }
        }
    });

    if (!payload) {
        redirect("/login");
    }

    const hasTrainingProgram = payload.trainingProgram !== null;

    if (!hasTrainingProgram) {
        redirect("/create");
    }

    return (
        <HomeClient trainingProgram={payload.trainingProgram}/>
    )
}