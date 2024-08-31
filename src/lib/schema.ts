import {z} from "zod";

export const EquipmentEnum = z.enum([
    "Barbell",
    "Dumbbell",
    "Bodyweight",
    "Resistance Band",
    "Machine",
    "Kettlebell",
    "Medicine Ball",
    "Cable Machine",
    "Smith Machine",
    "TRX",
    "Exercise Ball",
    "Foam Roller",
    "Pull-Up Bar",
    "Battle Ropes",
    "Rowing Machine",
    "Elliptical",
    "Treadmill",
]).describe("Types of equipment used in exercises");

const CategoryEnum = z.enum(["Strength", "Cardio", "Flexibility"]).describe("Categories of exercises");

export const ExerciseEnum = z.enum([
    "Bench Press",
    "Squat",
    "Deadlift",
    "Pull-Up",
    "Pull-Up (Assisted)",
    "Overhead Press",
    "Rowing",
    "Bicep Curl",
    "Tricep Extension",
    "Leg Press",
    "Lunge",
    "Plank",
    "Crunch",
    "Leg Raise",
    "Dumbbell Fly",
    "Lat Pulldown",
    "Russian Twist",
    "Battle Rope Slams",
    "Kettlebell Swing",
    "Goblet Squat",
    "Front Squat",
    "Sumo Deadlift",
    "Romanian Deadlift",
    "Chest Press Machine",
    "Seated Row",
    "Cable Fly",
    "Skull Crushers",
    "Hammer Curl",
    "Side Plank",
    "Mountain Climbers",
    "Burpees",
    "Jumping Jacks",
    "High Knees",
    "Box Jump",
    "Step-Up",
    "Hip Thrust",
    "Glute Bridge",
    "Cable Tricep Pushdown",
    "Leg Curl",
    "Leg Extension",
]).describe("Types of exercises");

const WeightSchema = z.object({
    amount: z.number().describe("Amount of weight"),
    unit: z.enum(["kg", "lbs"]).describe("Unit of weight"),
}).describe("Schema for weight");

const ExerciseSchema = z.object({
    name: ExerciseEnum.describe("Name of the exercise"),
    description: z.string().describe("Description of the exercise"),
    category: CategoryEnum.describe("Category of the exercise"),
    muscleGroups: z.array(z.string()).optional().describe("Muscle groups targeted by the exercise"),
    muscleGroupCount: z.number().describe("Number of muscle groups targeted"),
    equipment: z.array(EquipmentEnum).optional().describe("Equipment used for the exercise"),
    sets: z.number().default(3).describe("Number of sets"),
    reps: z.number().default(12).describe("Number of repetitions"),
    weight: WeightSchema.optional().nullable().describe("Weight used in the exercise"),
    assistWeight: WeightSchema.optional().nullable().describe("Assistance weight used in the exercise"),
    duration: z.number().optional().describe("Duration of the exercise in seconds"),
}).describe("Schema for an exercise");

export const WorkoutSchema = z.object({
    day: z.number().describe("Day of the workout"),
    workoutName: z.string().describe("Name of the workout"),
    workoutDescription: z.string().describe("Description of the workout"),
    workout: z.array(ExerciseSchema).describe("List of exercises in the workout"),
    duration: z.number().describe("Duration of the workout in minutes"),
    caloriesBurned: z.number().describe("Calories burned during the workout"),
}).describe("Schema for a workout");

export const MetadataSchema = z.object({
    programName: z.string().describe("Name of the training program"),
    programDescription: z.string().describe("Description of the training program"),
    personalInfo: z.object({
        age: z.number().describe("Age of the individual"),
        weight: z.number().describe("Weight of the individual"),
        height: z.number().describe("Height of the individual"),
        fitnessLevel: z.enum(["beginner", "intermediate", "advanced"]).describe("Fitness level of the individual"),
        gender: z.enum(["male", "female", "other"]).describe("Gender of the individual"),
    }).describe("Personal information of the individual"),
}).describe("Schema for metadata of the training program");

export const TrainingProgramSchema = z.object({
    metadata: MetadataSchema.describe("Metadata of the training program"),
    exercises: z.array(WorkoutSchema).describe("List of workouts in the training program"),
}).describe("Schema for a training program");


export type MetadataType = z.infer<typeof MetadataSchema>;
export type WorkoutType = z.infer<typeof WorkoutSchema>;
export type ExerciseType = z.infer<typeof ExerciseSchema>;
export type TrainingProgramType = z.infer<typeof TrainingProgramSchema>;