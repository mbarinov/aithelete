import {generateObject} from "ai";
import { openai} from "@ai-sdk/openai";
import {TrainingProgramSchema, ExerciseEnum, EquipmentEnum} from "@/lib/schema";

export async function POST(req: Request) {
    const {age, sex, height, weight, fitnessLevel} = await req.json();

    const availableExercises = ExerciseEnum.options.join(", ");
    const availableEquipment = EquipmentEnum.options.join(", ");

    const prompt = `
    Generate a personalized 3-day split training program for a ${age}-year-old ${sex}, ${height} cm tall, weighing ${weight} kg, at a ${fitnessLevel} fitness level. The program should be well-structured, targeting specific muscle groups each day to ensure balanced development and adequate recovery.

**Available Exercises:** ${availableExercises}
**Available Equipment:** ${availableEquipment}

    **Adaptation Requirements:**
1. The exercises should be tailored to the fitness level of a ${fitnessLevel}, offering appropriate challenges without risk of overtraining.
2. Consider the individual’s body dimensions, gender and weight in the selection of exercises and recommended weights.
`;


    const system = `
  You are a professional fitness trainer creating personalized workout plans.

**Requirements:**

1. **Split Focus:** Design a 3-day split workout, each focusing on different major muscle groups or combinations (e.g., Chest/Triceps, Back/Biceps, Legs/Shoulders). Ensure no significant overlap in targeted muscle groups on consecutive days to allow for optimal recovery.
2. **Exercise Structure:** Each workout day should include 4 to 8 exercises. Specify the name of each exercise, the number of sets and repetitions, and the recommended weight (in kg), adapting to the individual's fitness level and goals.
3. **Workout Day Details:** Provide a unique and descriptive name for each workout day that reflects the targeted muscle group(s). Include a brief description (2-3 sentences) summarizing the goals and key features of the workout, emphasizing the intended outcomes (e.g., strength, toning, endurance).

**Fitness Level Definitions with Training Experience:**
1. **Beginner (0-3 months of training experience):** Little to no prior training experience. Exercises should focus on building foundational strength, proper form, and muscular endurance. Use lighter weights. Include more low-intensity exercises to prevent overtraining.
2. **Intermediate (6-12 months of training experience):** Some training experience and a moderate level of fitness. Exercises should aim to increase strength, muscle tone, and stamina. Incorporate a mix of moderate weights. Include both compound and isolation movements, with moderate rest periods.
3. **Advanced (12+ months of training experience):** Extensive training experience and a high level of fitness. Exercises should target hypertrophy, maximum strength, and muscle definition. Use heavier weights. Include complex movements for increased intensity.

**Additional Notes:**

- Include a mix of compound movements that engage multiple muscle groups and isolation exercises for targeted muscle development.
- Ensure a balanced approach that supports strength, endurance, and flexibility.
- Provide modifications or alternative exercises for varying fitness levels or equipment availability.
- Consider the individual's preferences, limitations, and goals when designing the program.
- Use clear and concise language to explain the purpose and benefits of each exercise.
- Use only available equipment and exercises from the provided list. 
  `;

    const {object} = await generateObject({
        model: openai("gpt-4o-mini"),
        schema: TrainingProgramSchema,
        schemaName: "Personalized Training Program",
        schemaDescription: "A personalized 3-day split training program",
        prompt,
        system,
        mode: 'json',
        maxRetries: 3,
    });

    return Response.json(object);
}
