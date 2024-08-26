"use client";

import {Button} from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {motion, AnimatePresence} from "framer-motion";
import {experimental_useObject as useObject} from "ai/react";
import {
    CaretRight,
    CaretLeft,
    Sparkle,
} from "phosphor-react";
import {MetadataType, TrainingProgramSchema, WorkoutType} from "@/lib/schema";
import {useFormState} from "@/hooks/useFormState";
import {
    AgeStep,
    SexStep,
    HeightStep,
    WeightStep,
    FitnessLevelStep,
} from "@/components/FormSteps";
import {TrainingProgram} from "@/components/TrainingProgram";

export default function RootPage() {
    const {
        step,
        formData,
        updateFormData,
        nextStep,
        prevStep,
        TOTAL_STEPS,
    } = useFormState();

    const {submit, object, isLoading, error} = useObject({
        api: "/api/generate-program",
        schema: TrainingProgramSchema,
    });

    const metadata = object?.metadata as MetadataType;
    const exercises = object?.exercises as WorkoutType[];

    const generateProgram = async () => {
        submit(formData);
    };

    const renderFormStep = () => {
        const steps: JSX.Element[] = [
            <AgeStep key="age" formData={formData}
                     updateFormData={updateFormData}/>,
            <SexStep key="sex" formData={formData}
                     updateFormData={updateFormData}/>,
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

    return (
        <div
            className="bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen flex items-center justify-center">
            <div
                className="max-w-2xl mx-auto p-4 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {!object && !isLoading ? (
                        <motion.div
                            key="form"
                            initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -50}}
                            transition={{duration: 0.5}}
                            className="w-full"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle
                                        className="text-2xl font-bold text-center">
                                        🏋️‍♀️ AIthelete 🏃‍♂️
                                    </CardTitle>
                                    <CardDescription className="text-center">
                                        Create your personalized AI-powered
                                        training program in just
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
                                            initial={{opacity: 0, x: 50}}
                                            animate={{opacity: 1, x: 0}}
                                            exit={{opacity: 0, x: -50}}
                                            transition={{duration: 0.3}}
                                        >
                                            {renderFormStep()}
                                        </motion.div>
                                    </AnimatePresence>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    {step > 1 && (
                                        <Button onClick={prevStep}
                                                variant="outline">
                                            <CaretLeft
                                                className="mr-2 h-4 w-4"/> Back
                                        </Button>
                                    )}
                                    <div
                                        className={step === 1 ? "ml-auto" : ""}>
                                        <Button
                                            onClick={
                                                step === TOTAL_STEPS ? generateProgram : nextStep
                                            }
                                            disabled={isLoading}
                                        >
                                            {step < TOTAL_STEPS ? (
                                                <>
                                                    Next <CaretRight
                                                    className="ml-2 h-4 w-4"/>
                                                </>
                                            ) : (
                                                <>
                                                    {isLoading ? "Generating..." : "Generate"}{" "}
                                                    <Sparkle
                                                        className="ml-2 h-4 w-4"/>
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
                            initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -50}}
                            transition={{duration: 0.5}}
                            className="w-full"
                        >
                            <TrainingProgram metadata={metadata} exercises={exercises} />
                        </motion.div>
                    )}
                </AnimatePresence>
                {!!error && (
                    <div className="text-red-500 mt-4 text-center">
                        An error occurred while generating your program. Please
                        try again.
                    </div>
                )}
            </div>
        </div>
    );
}
