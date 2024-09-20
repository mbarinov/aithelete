import {
    ChatPromptTemplate,
} from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import {ChatOpenAI} from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { z } from "zod";
import type {TrainingProgramType} from "@/lib/schema";
import {
    TrainingPlanSystemMessage,
    TrainingPlanHumanMessage,
} from "./prompts";
import {formatTrainingProgram} from "@/lib/utils";
import type {GraphState} from "@/lib/agent/types";
import {TrainingProgramSchema} from "@/lib/schema";

export async function generate(state: GraphState): Promise<Partial<GraphState>> {
    if (!state.age ||
        !state.weight ||
        !state.height ||
        !state.fitnessLevel) {
        throw new Error("Missing required fields");
    }

    const parser = StructuredOutputParser.fromZodSchema(TrainingProgramSchema);
    const formatInstructions = parser.getFormatInstructions();


    const prompt = ChatPromptTemplate.fromMessages([
        TrainingPlanSystemMessage,
        TrainingPlanHumanMessage
    ]);

    const llm = new ChatOpenAI({
        model: "gpt-4o",
        temperature: 0.7,
    });

    const structuredLLM = llm.withStructuredOutput(TrainingProgramSchema);

    const chain = RunnableSequence.from([
        prompt,
        structuredLLM,
    ]);

    let retries = 0;
    let res: TrainingProgramType | null = null;
    const MAX_RETRIES = 3;

    while (retries < MAX_RETRIES) {
        try {
            res = await chain.invoke({
                age: state.age,
                gender: state.gender,
                height: state.height,
                weight: state.weight,
                fitnessLevel: state.fitnessLevel,
                availableExercises: state.availableExercises,
                availableEquipment: state.availableEquipment,
                draft: formatTrainingProgram(state.draft),
                recommendations: state.recommendations,
                formatInstructions,
            }) as TrainingProgramType;

            TrainingProgramSchema.parse(res);

            break;
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error(`Attempt ${retries + 1} failed: Output doesn't match schema`);
                console.error(error.errors);
            } else {
                console.error(`Attempt ${retries + 1} failed with error:`, error);
            }
            retries++;

            if (retries === MAX_RETRIES) {
                throw new Error(`Failed to generate valid output after ${MAX_RETRIES} attempts`);
            }
        }
    }

    if (!res) {
        throw new Error("Failed to generate valid output");
    }

    return {
        draft: res as TrainingProgramType,
        revisionNumber: state.revisionNumber++,
    }
}
