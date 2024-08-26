import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import type {WorkoutType} from "@/lib/schema";

interface WorkoutProps {
    workout: WorkoutType
}

export function Workout({workout}: WorkoutProps) {
    if(!workout) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Day {workout?.day}: {workout?.workoutName}
                </CardTitle>
                <CardDescription>{workout?.workoutDescription}</CardDescription>
                <CardDescription>{workout?.duration} minutes</CardDescription>
                <CardDescription>{workout?.caloriesBurned} calories
                    burned</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {workout?.workout?.map((exercise) => (
                        <Card key={exercise?.name}>
                            <CardHeader>
                                <CardTitle>{exercise?.name}</CardTitle>
                                <CardDescription>{exercise?.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    <strong>Category:</strong> {exercise?.category}
                                </p>
                                <p>
                                    <strong>Muscle
                                        Groups:</strong> {exercise?.muscleGroups?.join(", ")}
                                </p>
                                <p>
                                    <strong>Equipment:</strong> {exercise?.equipment?.join(", ")}
                                </p>
                                <p>
                                    <strong>Sets:</strong> {exercise?.sets}
                                </p>
                                <p>
                                    <strong>Reps:</strong> {exercise?.reps}
                                </p>
                                {exercise?.weight && (
                                    <p>
                                        <strong>Weight:</strong> {exercise?.weight.amount} {exercise.weight.unit}
                                    </p>
                                )}
                                {exercise?.assistWeight && (
                                    <p>
                                        <strong>Assist
                                            Weight:</strong> {exercise?.assistWeight.amount} {exercise.assistWeight.unit}
                                    </p>
                                )}
                                {exercise?.duration && (
                                    <p>
                                        <strong>Duration:</strong> {exercise?.duration} minutes
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}