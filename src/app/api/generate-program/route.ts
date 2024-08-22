import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { TrainingProgramSchema } from "@/lib/schema";

export const runtime = "edge";

export async function POST(req: Request) {
  const { age, sex, height, weight, fitnessLevel } = await req.json();

  const prompt = `
Generate a personalized 3-day split training program for a ${age}-year-old ${sex}, ${height} cm tall, weighing ${weight} kg, with an ${fitnessLevel} fitness level. The program should be well-structured, targeting specific muscle groups on each day to ensure comprehensive development and recovery.

Requirements:

Split Focus: Design each day to focus on a different major muscle group or combination of muscle groups (e.g., Chest/Triceps, Back/Biceps, Legs/Shoulders). Ensure that the muscle groups targeted on consecutive days do not overlap significantly to allow for proper recovery.
Exercise Structure: Each day should consist of a balanced number of exercises, varying between 4 to 8 exercises depending on the focus of the workout. Specify the name of each exercise, the number of sets and repetitions, and the recommended weight (in kg) where applicable.
Workout Day Details: Provide a unique and descriptive name for each workout day that reflects the targeted muscle group(s). Include a brief description (2-3 sentences) summarizing the goals and key features of the workout.
Adaptation: Ensure the exercises are suited to an ${fitnessLevel} fitness level, offering appropriate challenges while avoiding overtraining.

Additional Notes:
Include compound movements that engage multiple muscle groups along with isolation exercises for focused muscle engagement.
Ensure the program maintains balance between strength, endurance, and flexibility to support overall fitness goals.
`;

  const system = `
  You are a professional fitness trainer creating personalized workout plans. Always respond with valid JSON that matches the provided schema.
  
  You understand and can work with the following schema for creating training programs:

Equipment Types:
Barbell, Dumbbell, Bodyweight, Resistance Band, Machine, Kettlebell, Medicine Ball, Cable Machine, Smith Machine, TRX, Exercise Ball, Foam Roller, Pull-Up Bar, Battle Ropes, Rowing Machine, Elliptical, Treadmill
Exercise Categories:
Strength, Cardio, Flexibility
Exercise Names:
Bench Press, Squat, Deadlift, Pull-Up, Push-Up, Overhead Press, Rowing, Bicep Curl, Tricep Extension, Leg Press, Lunge, Plank, Crunch, Leg Raise, Dumbbell Fly, Lat Pulldown, Russian Twist, Battle Rope Slams, Kettlebell Swing, Goblet Squat, Front Squat, Sumo Deadlift, Romanian Deadlift, Chest Press Machine, Seated Row, Cable Fly, Skull Crushers, Hammer Curl, Side Plank, Mountain Climbers, Burpees, Jumping Jacks, High Knees, Box Jump, Step-Up, Hip Thrust, Glute Bridge, Cable Tricep Pushdown, Leg Curl, Leg Extension
Weight:

Amount: A number
Unit: "kg"


Exercise:

Name: One of the predefined exercise names
Description: A brief explanation of the exercise
Category: One of the predefined categories (Strength, Cardio, Flexibility)
Muscle Groups: List of muscle groups targeted
Muscle Group Count: Number of muscle groups targeted
Equipment: List of equipment types needed
Sets: Number of sets (default: 3)
Reps: Number of repetitions (default: 8)
Weight: Optional, can be null, includes amount and unit


Workout:

Day: Number indicating the day of the workout
Workout Name: Name of the workout
Workout Description: Brief description of the workout
Exercises: List of exercises following the Exercise schema


Training Program:

Workouts: List of workouts following the Workout schema


When creating a training program, you should structure your response according to this schema. Each workout should have a day, name, description, and a list of exercises. For each exercise, provide all the required information including name, description, category, muscle groups, equipment, sets, reps, and weight (if applicable).
  `;

  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: TrainingProgramSchema,
    mode: "json",
    schemaName: "Training Program",
    schemaDescription: "A 3-day workout program for a user",
    prompt,
    system,
  });

  return Response.json(object);
}
