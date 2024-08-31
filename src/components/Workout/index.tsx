import React from "react";
import type { WorkoutType, ExerciseType } from "@/lib/schema";

interface WorkoutProps {
    workout: WorkoutType;
}

export function Workout({ workout }: WorkoutProps) {
    if (!workout) return null;

    return (
        <div className="w-full max-w-md mx-auto p-2 sm:p-4 md:p-6">
            <div className="text-lg sm:text-xl md:text-2xl font-bold">
                Day {workout.day}: {workout.workoutName}
            </div>
            <div className="space-y-2 mt-4">
                {workout.workout.map((exercise) => (
                    <ExerciseCard key={exercise.name} exercise={exercise} />
                ))}
            </div>
        </div>
    );
}

interface ExerciseCardProps {
    exercise: ExerciseType;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
    return (
        <div className="p-1 sm:p-2 md:p-3 flex justify-between">
            <div className="text-base sm:text-lg md:text-xl font-bold">
                {exercise.name}
            </div>
            <div className="space-y-1">
                <span className="text-sm text-muted-foreground">
                    {exercise.sets} x {exercise.reps} {exercise.weight && `@ ${exercise.weight.amount}${exercise.weight.unit}`}
                </span>
            </div>
        </div>
    );
};