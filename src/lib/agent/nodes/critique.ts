import {
    ChatPromptTemplate,
} from "@langchain/core/prompts";
import {StructuredOutputParser} from "@langchain/core/output_parsers";
import {ChatOpenAI} from "@langchain/openai";
import {z} from "zod";
import {RunnableSequence} from "@langchain/core/runnables";
import {
    CritiqueSchema, CritiqueType,
    TrainingProgramSchema,
} from "@/lib/schema";
import {
    CritiqueSystemMessage,
    CritiqueHumanMessage,
} from "./prompts";
import {
    formatTrainingProgram
} from "@/lib/utils";
import type {GraphState} from "@/lib/agent/types";

export async function critique(state: GraphState): Promise<Partial<GraphState>> {
    if (!state.draft) {
        throw new Error("Missing required fields");
    }

    const parser = StructuredOutputParser.fromZodSchema(CritiqueSchema);
    const formatInstructions = parser.getFormatInstructions();

    const prompt = ChatPromptTemplate.fromMessages([
        CritiqueSystemMessage,
        CritiqueHumanMessage
    ]);

    const llm = new ChatOpenAI({
        model: "gpt-4o-mini",
        temperature: 0.7,
    });

    const structuredLLM = llm.withStructuredOutput(CritiqueSchema);

    const chain = RunnableSequence.from([
        prompt,
        structuredLLM,
    ]);

    let retries = 0;
    let res: CritiqueType | null = null;
    const MAX_RETRIES = 3;

    while (retries < MAX_RETRIES) {
        try {
            res = await chain.invoke({
                ...state,
                draft: formatTrainingProgram(state.draft),
                formatInstructions,
            });

            CritiqueSchema.parse(res);

            // If validation passes, break the loop
            break;
        } catch (error) {
            console.log("Error in critique node", error);
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

    const {safetyScore, alignmentScore, balanceScore, effectivenessScore} = res;
    const score = safetyScore + alignmentScore + balanceScore + effectivenessScore;

    return {
        score: score,
        recommendations: res.recommendations,
        revisionNumber: state.revisionNumber += 1,
    }
}