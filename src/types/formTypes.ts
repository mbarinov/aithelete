export interface FormData {
  age?: number;
  gender?: "male" | "female" | "other";
  height?: number;
  weight?: number;
  fitnessLevel?: "beginner" | "intermediate" | "advanced";
}

export type FormField = keyof FormData;
