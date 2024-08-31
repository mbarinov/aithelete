import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import {MetadataType, WorkoutType} from "@/lib/schema";
import {Workout} from "@/components/Workout";
import {Button} from "@/components/ui/button";
import {Barbell, Pencil} from '@phosphor-icons/react/dist/ssr';
import Link from "next/link";


type TrainingProgramProps = {
    metadata?: MetadataType;
    exercises?: WorkoutType[];
    onEdit?: () => void;
}

export const TrainingProgram: React.FC<TrainingProgramProps> = ({
                                                                    exercises,
                                                                    metadata,
                                                                    onEdit
                                                                }) => {
    if (!exercises || !metadata) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-center">
                    <Barbell className="mr-2"/>
                    {metadata.programName}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {exercises.map((workout) => (
                        <Workout workout={workout} key={workout.workoutName}/>
                    ))}
                </div>
                <div className="flex flex-col space-y-4 mt-4 w-full">
                    <Link href="/home">
                        <Button
                            className="w-full flex items-center justify-center">
                            <Barbell className="mr-2"/> Save
                        </Button>
                    </Link>
                    <Button variant="outline" onClick={() => onEdit?.()}
                            className="w-full flex items-center justify-center">
                        <Pencil className="mr-2"/> Change Program
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};