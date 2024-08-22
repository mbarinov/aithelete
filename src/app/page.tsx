"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  User,
  Ruler,
  Scales,
  Barbell,
  CaretRight,
  CaretLeft,
  Sparkle,
  ArrowClockwise,
  GenderMale,
  GenderFemale,
  GenderIntersex,
  Person,
  PersonSimpleRun,
} from "phosphor-react";
import { TrainingProgramSchema } from "@/lib/schema";

export default function Component() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    height: "",
    weight: "",
    sportCondition: "",
  });

  const { submit, object, isLoading, error } = useObject({
    api: "/api/generate-program",
    schema: TrainingProgramSchema,
  });

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateProgram = async () => {
    submit(formData);
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
    if (step === 5) generateProgram();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      age: "",
      sex: "",
      height: "",
      weight: "",
      sportCondition: "",
    });
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <Label htmlFor="age">How old are you?</Label>
            <div className="flex items-center space-x-2">
              <User className="text-muted-foreground" />
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => updateFormData("age", e.target.value)}
                placeholder="Enter your age"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Label>What&apos;s your biological sex?</Label>
            <div className="flex space-x-4">
              <Button
                variant={formData.sex === "male" ? "default" : "outline"}
                onClick={() => updateFormData("sex", "male")}
              >
                <GenderMale className="mr-2 h-4 w-4" />
                Male
              </Button>
              <Button
                variant={formData.sex === "female" ? "default" : "outline"}
                onClick={() => updateFormData("sex", "female")}
              >
                <GenderFemale className="mr-2 h-4 w-4" />
                Female
              </Button>
              <Button
                variant={formData.sex === "other" ? "default" : "outline"}
                onClick={() => updateFormData("sex", "other")}
              >
                <GenderIntersex className="mr-2 h-4 w-4" />
                Other
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <Label htmlFor="height">How tall are you?</Label>
            <div className="flex items-center space-x-2">
              <Ruler className="text-muted-foreground" />
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => updateFormData("height", e.target.value)}
                placeholder="Height in cm"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <Label htmlFor="weight">What&apos;s your weight?</Label>
            <div className="flex items-center space-x-2">
              <Scales className="text-muted-foreground" />
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => updateFormData("weight", e.target.value)}
                placeholder="Weight in kg"
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <Label>What&apos;s your current fitness level?</Label>
            <div className="flex space-x-4">
              <Button
                variant={
                  formData.sportCondition === "beginner" ? "default" : "outline"
                }
                onClick={() => updateFormData("sportCondition", "beginner")}
              >
                <Person className="mr-2 h-4 w-4" />
                Beginner
              </Button>
              <Button
                variant={
                  formData.sportCondition === "intermediate"
                    ? "default"
                    : "outline"
                }
                onClick={() => updateFormData("sportCondition", "intermediate")}
              >
                <PersonSimpleRun className="mr-2 h-4 w-4" />
                Intermediate
              </Button>
              <Button
                variant={
                  formData.sportCondition === "advanced" ? "default" : "outline"
                }
                onClick={() => updateFormData("sportCondition", "advanced")}
              >
                <Barbell className="mr-2 h-4 w-4" />
                Advanced
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderProgram = () => {
    if (!object) return null;

    try {
      return (
        <div className="space-y-8">
          {object.exercises?.map((workout, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>
                  Day {workout?.day}: {workout?.workoutName}
                </CardTitle>
                <CardDescription>{workout?.workoutDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workout?.workout?.map((exercise) => (
                    <Card key={exercise?.name}>
                      <CardHeader>
                        <CardTitle>{exercise?.name}</CardTitle>
                        <CardDescription>
                          {exercise?.description}
                        </CardDescription>
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
                            <strong>Weight:</strong> {exercise.weight.amount}{" "}
                            {exercise.weight.unit}
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
    } catch (error) {
      console.error("Failed to parse program:", error);
      return <p>Failed to generate program. Please try again.</p>;
    }
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
                  <Progress value={(step / 5) * 100} className="mb-4" />
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
                    <Button onClick={nextStep} disabled={isLoading}>
                      {step < 5 ? (
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
                    Your AI-Generated Training Program
                  </CardTitle>
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
