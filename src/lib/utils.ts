import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import type {TrainingProgramType} from "@/lib/schema";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatTrainingProgram(program?: TrainingProgramType) {
    if (!program) {
        return '';
    }

    return program.exercises
        .map((exerciseDay) => {
            const dayHeader = `Day ${exerciseDay.day}: ${exerciseDay.workoutName}\n`;
            const exercises = exerciseDay.workout
                .map((exercise) => {
                    const exerciseHeader = `  - ${exercise.name}:\n`;
                    const setsReps = `    Sets: ${exercise.sets}, Reps: ${exercise.reps}\n`;
                    const weight = exercise.weight
                        ? `    Weight: ${exercise.weight.amount} ${exercise.weight.unit}\n`
                        : `    Weight: Bodyweight\n`;
                    const assistWeight = exercise.assistWeight ? `    Assistance Weight: ${exercise.assistWeight.amount} ${exercise.assistWeight.unit}\n` : '';

                    return exerciseHeader + setsReps + weight + assistWeight;
                })
                .join('\n');

            return dayHeader + exercises;
        })
        .join('\n\n');
}