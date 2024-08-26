"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { experimental_useObject as useObject } from "ai/react";
import {
  CaretRight,
  CaretLeft,
  Sparkle,
  ArrowClockwise,
  Barbell,
} from "phosphor-react";
import { TrainingProgramSchema } from "@/lib/schema";
import { useFormState } from "@/hooks/useFormState";
import {
  AgeStep,
  SexStep,
  HeightStep,
  WeightStep,
  FitnessLevelStep,
} from "@/components/FormSteps";

export default function RootPage() {
  const {
    step,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    resetForm,
    TOTAL_STEPS,
  } = useFormState();

  const { submit, object, isLoading, error } = useObject({
    api: "/api/generate-program",
    schema: TrainingProgramSchema,
  });

  const generateProgram = async () => {
    submit(formData);
  };

  const renderFormStep = () => {
    const steps: JSX.Element[] = [
      <AgeStep key="age" formData={formData} updateFormData={updateFormData} />,
      <SexStep key="sex" formData={formData} updateFormData={updateFormData} />,
      <HeightStep
        key="height"
        formData={formData}
        updateFormData={updateFormData}
      />,
      <WeightStep
        key="weight"
        formData={formData}
        updateFormData={updateFormData}
      />,
      <FitnessLevelStep
        key="fitness"
        formData={formData}
        updateFormData={updateFormData}
      />,
    ];
    return steps[step - 1];
  };

  const renderProgram = () => {
    if (!object?.exercises) return null;

    return (
      <div className="space-y-8">
        {object.exercises.map((workout, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>
                Day {workout?.day}: {workout?.workoutName}
              </CardTitle>
              <CardDescription>{workout?.workoutDescription}</CardDescription>
              <CardDescription>{workout?.duration} minutes</CardDescription>
                <CardDescription>
                    {workout?.caloriesBurned} calories burned
                </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workout?.workout?.map((exercise) => (
                  <Card key={exercise?.name}>
                    <CardHeader>
                      <CardTitle>{exercise?.name}</CardTitle>
                      <CardDescription>{exercise?.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <strong>Category:</strong> {exercise?.category}
                      </p>
                      <p>
                        <strong>Muscle Groups:</strong>{" "}
                        {exercise?.muscleGroups?.join(", ")}
                      </p>
                      <p>
                        <strong>Equipment:</strong>{" "}
                        {exercise?.equipment?.join(", ")}
                      </p>
                      <p>
                        <strong>Sets:</strong> {exercise?.sets}
                      </p>
                      <p>
                        <strong>Reps:</strong> {exercise?.reps}
                      </p>
                      {exercise?.weight && (
                        <p>
                          <strong>Weight:</strong> {exercise?.weight.amount}{" "}
                          {exercise.weight.unit}
                        </p>
                      )}
                        {exercise?.assistWeight && (
                            <p>
                            <strong>Assist Weight:</strong>{" "}
                            {exercise?.assistWeight.amount} {exercise.assistWeight.unit}
                            </p>
                        )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!object ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center">
                    🏋️‍♀️ AIthelete 🏃‍♂️
                  </CardTitle>
                  <CardDescription className="text-center">
                    Create your personalized AI-powered training program in just
                    a few steps!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress
                    value={(step / TOTAL_STEPS) * 100}
                    className="mb-4"
                  />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderFormStep()}
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {step > 1 && (
                    <Button onClick={prevStep} variant="outline">
                      <CaretLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                  )}
                  <div className={step === 1 ? "ml-auto" : ""}>
                    <Button
                      onClick={
                        step === TOTAL_STEPS ? generateProgram : nextStep
                      }
                      disabled={isLoading}
                    >
                      {step < TOTAL_STEPS ? (
                        <>
                          Next <CaretRight className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          {isLoading ? "Generating..." : "Generate"}{" "}
                          <Sparkle className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="program"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <Barbell className="mr-2" />
                    {object?.metadata?.programName}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {object?.metadata?.programDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>{renderProgram()}</CardContent>
                <CardFooter className="flex justify-center">
                  <Button onClick={resetForm} variant="outline">
                    <ArrowClockwise className="mr-2 h-4 w-4" />
                    Generate New Program
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
        {!!error && (
          <div className="text-red-500 mt-4 text-center">
            An error occurred while generating your program. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}
