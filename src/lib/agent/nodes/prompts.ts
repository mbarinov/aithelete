import {
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate
} from '@langchain/core/prompts'

export const TrainingPlanSystemMessage = SystemMessagePromptTemplate.fromTemplate(`
You are a professional fitness trainer responsible for creating personalized 3-day split workout programs.

Your goal is to develop training plans tailored to the individual’s fitness level, ensuring balanced development, adequate recovery, and use of available exercises and equipment.

**Fitness Level Guidelines**:
- **Beginner (0-3 months)**: Focus on foundational strength, proper form, and muscular endurance with lighter weights and low-intensity exercises.
- **Intermediate (6-12 months)**: Aim to increase strength, muscle tone, and stamina using moderate weights with compound and isolation exercises.
- **Advanced (12+ months)**: Emphasize hypertrophy, maximum strength, and muscle definition with heavier weights and complex movements.

Use only the exercises and equipment provided. Do not include any exercises or equipment not listed.

{formatInstructions}
`);

export const TrainingPlanHumanMessage = HumanMessagePromptTemplate.fromTemplate(`
Generate a personalized 3-day split training program for a {age}-year-old {gender}, {height} cm tall, weighing {weight} kg, at a {fitnessLevel} fitness level. The program should focus on balanced muscle development and adequate recovery, tailored specifically to the individual.

**Step-by-Step Planning:**

1. **Review Muscle Group Split**:
   - Assign appropriate muscle groups to each day, ensuring balance and avoiding overlap on consecutive days.

2. **Select and Structure Exercises**:
   - Choose an appropriate number of exercises for each day that align with the muscle group focus.
   - Specify sets, reps, and intensity, adjusted to suit the individual's profile.
   - Use the provided exercises and equipment only.

3. **Check Recovery and Balance**:
   - Confirm that exercises are arranged to optimize performance and reduce fatigue.
   - Validate that no major muscle group is overworked across consecutive days.

4. **Customize and Adjust**:
   - Adjust intensity, sets, and reps to match body dimensions and fitness level specifics.
   - Ensure only listed exercises and equipment are used.

5. **Finalize Workout Details**:
   - Assign a descriptive name and a brief summary for each workout day.
   - Reconfirm the program's alignment with fitness level and recovery needs.
   
**Program Requirements:**

1. **Split Focus**:
   - Create a 3-day split targeting different muscle groups each day. (e.g Back & Biceps, Chest & Triceps, Legs & Shoulders)
   - Ensure muscle groups are not targeted on consecutive days to allow for recovery.

2. **Exercise Structure**:
     - Include a minimum of 4 and a maximum of 8 exercises per workout day, using only the provided list.
     - Exercise name.
     - Number of sets and repetitions.
     - Recommended weight (kg) or intensity level, tailored to the fitness level.
     - Estimated duration of daily workout should be around 60-90 minutes.

3. **Workout Day Overview**:
   - Name each workout day to reflect the muscle groups targeted.
   - Provide a brief description (2-3 sentences) outlining the day's focus and expected outcomes.

**Adaptation Guidelines:**

- **Fitness Level**: Match exercises and intensity to the {fitnessLevel} to avoid overtraining or undertraining.
- **Personalization**: Factor in the individual's body dimensions, gender, and weight when selecting exercises and determining intensity.
- **Resources**: Use only the available exercises and equipment:
- **Available Exercises**: {availableExercises}.
- **Available Equipment**: {availableEquipment}.

**Optional Inputs**:
- **Training Program Draft**:
{draft}

- **Recommendations for the draft**: 
{recommendations}

{formatInstructions}
`);

export const CritiqueSystemMessage = SystemMessagePromptTemplate.fromTemplate(`
You are a professional fitness evaluator tasked with reviewing a 3-day split training program. Your goal is to provide constructive feedback to improve the program's effectiveness, safety, and alignment with the individual's fitness goals.

Your evaluation should focus on identifying potential weaknesses in the program and assessing the suitability of the exercises for the individual's fitness level, considering their personal information.
    `);

export const CritiqueHumanMessage = HumanMessagePromptTemplate.fromTemplate(`    
Instructions:

Analyze the Training Program using a comprehensive, step-by-step approach:

1. **Initial Review:**
   - Examine the overall structure of the training program, focusing on exercise selection, order, sets, repetitions, and recommended weights.
   - Evaluate the balance and distribution of muscle groups targeted across the three days.
   - Assess how well the program aligns with the individual's profile, including age, fitness level, and equipment availability.
   - Consider the program's progression and periodization strategy.

2. **Detailed Analysis:**
   - Identify specific strengths and weaknesses in the program, focusing on areas where it might fail to meet the individual's needs or where it could be enhanced.
   - Assess the suitability of the chosen exercises for the individual's fitness level, paying attention to potential gaps in muscle group targeting or exercise variety.
   - Evaluate the use of available equipment and adherence to the provided exercise list to ensure the program is feasible given the available resources.
   - Analyze the rest periods between sets and exercises, and recovery time between training days.
   - Consider the potential for overtraining or undertraining based on the program's volume and intensity.

3. **Score the Training Program:**
   Rate the program based on the following criteria (total possible score: 15 points):
   - Effectiveness Score: How well does the program meet the stated fitness goals? (0-4 points)
   - Safety Score: Are the exercise choices and progression safe for the individual's level? (0-3 points)
   - Balance Score: Is there an appropriate distribution of workload across different muscle groups? (0-3 points)
   - Progression Score: Does the program include a clear strategy for progressive overload? (0-3 points)
   - Alignment Score: Does the program align with the individual's fitness profile and objectives? (0-2 points)

4. **Provide Specific and Impactful Recommendations:**
   - Each recommendation must address a specific aspect of the training program.
   - Recommendations should be prioritized based on their potential impact on the program's quality and score.
   - Recommendations must not cause a decrease in the training program score when applied.
   - Limit recommendations to specific adjustments directly related to the training plan (e.g., exercise replacement, changes in sequence, set/rep adjustments, rest periods).
   - Provide a maximum of 3 recommendations, focusing on the most critical improvements.
   - Use the following format for each recommendation: 
     "Replace [Exercise Name] with [Recommended Exercise] to [Reason for Replacement]. [Expected Impact: high/medium/low]"
   - Ensure all recommendations use only the available exercises and equipment.

5. **Justification and Expected Impact:**
   - For each recommendation, provide a brief justification explaining why the change is necessary.
   - If the recommendations impact score is not high, remove the recommendation from the list.
   - Do not include recommendations that doesnt match provided template.
   - Do not include recommendations that include exercises or equipment not listed.

Training Program Draft:
{draft}

**User Information:**
Age: {age} years
Gender: {gender}
Height: {height} cm
Weight: {weight} kg
Fitness Level: {fitnessLevel}

Available Exercises and Equipment:
Exercises: {availableExercises}.
Equipment: {availableEquipment}.

{formatInstructions}
`);
