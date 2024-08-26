import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card";
import {
    Barbell
} from 'phosphor-react';
import {MetadataType, WorkoutType} from "@/lib/schema";
import {Workout} from "@/components/Workout";

type TrainingProgramProps = {
    metadata?: MetadataType;
    exercises?: WorkoutType[];
}

export const TrainingProgram: React.FC<TrainingProgramProps> = ({
                                                                    exercises,
                                                                    metadata
                                                                }) => {
    if (!exercises || !metadata) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-center">
                    <Barbell className="mr-2"/>
                    {metadata.programName}
                </CardTitle>
                <CardDescription>
                    {metadata.programDescription}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {exercises?.map((workout) => (
                        <Workout workout={workout} key={workout.workoutName}/>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};