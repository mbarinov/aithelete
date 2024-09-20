import {Annotation, MessagesAnnotation} from "@langchain/langgraph";
import type {TrainingProgramType} from "@/lib/schema";


export const GraphAnnotation = Annotation.Root({
    ...MessagesAnnotation.spec,
    age: Annotation<number>,
    gender: Annotation<string>,
    height: Annotation<number>,
    weight: Annotation<number>,
    fitnessLevel: Annotation<string>,
    availableExercises: Annotation<string[]>,
    availableEquipment: Annotation<string[]>,
    draft: Annotation<TrainingProgramType>,
    result: Annotation<TrainingProgramType>,
    revisionNumber: Annotation<number>,
    score: Annotation<number>,
    recommendations: Annotation<string[]>,
});

export type GraphState = typeof GraphAnnotation.State;