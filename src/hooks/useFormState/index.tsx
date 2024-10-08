import { useState } from "react";
import { FormData, FormField } from "@/types/formTypes";

const TOTAL_STEPS = 5;

export const useFormState = ({
                               initialData = {
                                    age: 24,
                                    gender: 'other',
                                    height: 180,
                                    weight: 80,
                                    fitnessLevel: 'beginner',
                               },
                             }: {
  initialData?: FormData;
} = {}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialData);

  const updateFormData = (field: FormField, value: FormData[FormField]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const resetForm = () => {
    setStep(1);
    setFormData({});
  };

  return {
    step,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    resetForm,
    TOTAL_STEPS,
  };
};
