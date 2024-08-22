import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  User,
  Ruler,
  Scales,
  Person,
  PersonSimpleRun,
  Barbell,
  GenderMale,
  GenderFemale,
  GenderIntersex,
} from "phosphor-react";
import { FormData, FormField } from "@/types/formTypes";

interface StepProps {
  formData: FormData;
  updateFormData: (field: FormField, value: FormData[FormField]) => void;
}
export const AgeStep: React.FC<StepProps> = ({ formData, updateFormData }) => (
  <div className="space-y-4">
    <Label htmlFor="age">How old are you?</Label>
    <div className="flex items-center space-x-2">
      <User className="text-muted-foreground" />
      <Input
        id="age"
        type="number"
        value={formData.age}
        onChange={(e) => updateFormData("age", parseInt(e.target.value, 10))}
        placeholder="Enter your age"
      />
    </div>
  </div>
);

export const SexStep: React.FC<StepProps> = ({ formData, updateFormData }) => (
  <div className="space-y-4">
    <Label>What&apos;s your biological sex?</Label>
    <div className="flex space-x-4">
      {["male", "female", "other"].map((sex) => (
        <Button
          key={sex}
          variant={formData.sex === sex ? "default" : "outline"}
          onClick={() => updateFormData("sex", sex as FormData["sex"])}
        >
          {sex === "male" && <GenderMale className="mr-2 h-4 w-4" />}
          {sex === "female" && <GenderFemale className="mr-2 h-4 w-4" />}
          {sex === "other" && <GenderIntersex className="mr-2 h-4 w-4" />}
          {sex.charAt(0).toUpperCase() + sex.slice(1)}
        </Button>
      ))}
    </div>
  </div>
);

export const HeightStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
}) => (
  <div className="space-y-4">
    <Label htmlFor="height">How tall are you?</Label>
    <div className="flex items-center space-x-2">
      <Ruler className="text-muted-foreground" />
      <Input
        id="height"
        type="number"
        value={formData.height}
        onChange={(e) =>
          updateFormData(
            "height",
            parseInt(e.target.value, 10) as FormData["height"]
          )
        }
        placeholder="Height in cm"
      />
    </div>
  </div>
);

export const WeightStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
}) => (
  <div className="space-y-4">
    <Label htmlFor="weight">What&apos;s your weight?</Label>
    <div className="flex items-center space-x-2">
      <Scales className="text-muted-foreground" />
      <Input
        id="weight"
        type="number"
        value={formData.weight}
        onChange={(e) =>
          updateFormData(
            "weight",
            parseInt(e.target.value, 10) as FormData["weight"]
          )
        }
        placeholder="Weight in kg"
      />
    </div>
  </div>
);

export const FitnessLevelStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
}) => (
  <div className="space-y-4">
    <Label>What&apos;s your current fitness level?</Label>
    <div className="flex space-x-4">
      {["beginner", "intermediate", "advanced"].map((level) => (
        <Button
          key={level}
          variant={formData.fitnessLevel === level ? "default" : "outline"}
          onClick={() => updateFormData("fitnessLevel", level as FormData["fitnessLevel"])}
        >
          {level === "beginner" && <Person className="mr-2 h-4 w-4" />}
          {level === "intermediate" && (
            <PersonSimpleRun className="mr-2 h-4 w-4" />
          )}
          {level === "advanced" && <Barbell className="mr-2 h-4 w-4" />}
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </Button>
      ))}
    </div>
  </div>
);
