import {END, START, StateGraph} from "@langchain/langgraph";
import {generate} from "./nodes/generate";
import {critique} from "./nodes/critique";
import {GraphAnnotation, GraphState} from "./types";

const verifyQuality = (
    state: GraphState,
): "generate_training_program_node" | "return_training_program_node" => {
    const { score, revisionNumber } = state;

    if (score < 8) {
        console.log('Score is less than 8 - returning to END');
        return "generate_training_program_node";
    }

    if (revisionNumber > 2) {
        console.log('Revision number is greater than 2 - returning to END');
        return "return_training_program_node";
    }

    return 'return_training_program_node';
};

function returnTrainingPlan(state: GraphState): Partial<GraphState> {
    return {
        result: state.draft,
    };
}

export function createAgent() {
    const graph = new StateGraph(GraphAnnotation)
        .addNode("generate_training_program_node", generate)
        .addNode("critique_training_program_node", critique)
        .addNode("return_training_program_node", returnTrainingPlan)

        .addEdge(START, "generate_training_program_node")
        .addEdge("generate_training_program_node", "critique_training_program_node")
        .addConditionalEdges("critique_training_program_node", verifyQuality)
        .addEdge("critique_training_program_node", END)

    return graph.compile();
}