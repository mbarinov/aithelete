export interface FormData {
  age?: number;
  sex?: "male" | "female" | "other";
  height?: number;
  weight?: number;
  fitnessLevel?: "beginner" | "intermediate" | "advanced";
}

export type FormField = keyof FormData;
