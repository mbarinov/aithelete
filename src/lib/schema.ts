import { z } from "zod";

const EquipmentEnum = z.enum([
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
]);

const CategoryEnum = z.enum(["Strength", "Cardio", "Flexibility"]);
const ExerciseEnum = z.enum([
  "Bench Press",
  "Squat",
  "Deadlift",
  "Pull-Up",
  "Push-Up",
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
]);

const WeightSchema = z.object({
  amount: z.number(),
  unit: z.enum(["kg", "lbs"]),
});

const ExerciseSchema = z.object({
  // exerciseId: z.string().uuid(),
  name: ExerciseEnum,
  description: z.string(),
  category: CategoryEnum,
  muscleGroups: z.array(z.string()),
  muscleGroupCount: z.number(),
  equipment: z.array(EquipmentEnum),
  sets: z.number().default(3),
  reps: z.number().default(8),
  weight: WeightSchema.optional().nullable(),
});

export const WorkoutSchema = z.object({
  day: z.number(),
  workoutName: z.string(),
  workoutDescription: z.string(),
  workout: z.array(ExerciseSchema),
});

export const TrainingProgramSchema = z.object({
  exercises: z.array(WorkoutSchema),
});