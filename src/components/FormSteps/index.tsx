import {Slider} from "@/components/ui/slider";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Button} from "@radix-ui/themes";
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
import {FormData, FormField} from "@/types/formTypes";

interface StepProps {
    formData: FormData;
    updateFormData: (field: FormField, value: FormData[FormField]) => void;
}

export const AgeStep: React.FC<StepProps> = ({formData, updateFormData}) => {
    return (
        <Card className="p-4">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-center">
                    How old are you?</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 flex flex-col gap-0.5">
                    <span>Age: {formData.age}</span>
                    <div className="flex items-center space-x-2">
                        <User className="text-muted-foreground"/>
                        <Slider
                            id="age"
                            min={18}
                            max={60}
                            defaultValue={[formData?.age || 18]}
                            onValueChange={([value]) => {
                                updateFormData("age", value);
                            }}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export const GenderStep: React.FC<StepProps> = ({formData, updateFormData}) => (
    <Card className="p-4">
        <CardHeader>
            <CardTitle className="text-xl font-bold text-center">
                What&apos;s your biological sex?</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="flex flex-col space-y-4 justify-center">
                    {["male", "female", "other"].map((gender) => (
                        <Button
                            key={gender}
                            variant={formData.gender === gender ? "classic" : "outline"}
                            onClick={() => updateFormData("gender", gender as FormData["gender"])}
                        >
                            {gender === "male" &&
                                <GenderMale className="mr-2 h-4 w-4"/>}
                            {gender === "female" &&
                                <GenderFemale className="mr-2 h-4 w-4"/>}
                            {gender === "other" &&
                                <GenderIntersex className="mr-2 h-4 w-4"/>}
                            {gender.charAt(0).toUpperCase() + gender.slice(1)}
                        </Button>
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
);

export const HeightStep: React.FC<StepProps> = ({
                                                    formData,
                                                    updateFormData,
                                                }) => (
    <Card className="p-4">
        <CardHeader>
            <CardTitle className="text-xl font-bold text-center">
                How tall are you?</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4 flex flex-col gap-0.5">
                <span>Height: {formData.height}cm</span>
                <div className="flex items-center space-x-2">
                    <Ruler className="text-muted-foreground"/>
                    <Slider
                        id="height"
                        min={120}
                        max={220}
                        defaultValue={[formData?.height || 175]}
                        onValueChange={([value]) => {
                            updateFormData("height", value as FormData["height"]);
                        }}
                    />
                </div>
            </div>
        </CardContent>
    </Card>
);

export const WeightStep: React.FC<StepProps> = ({
                                                    formData,
                                                    updateFormData,
                                                }) => (
    <Card className="p-4">
        <CardHeader>
            <CardTitle className="text-xl font-bold text-center">
                What&apos;s your weight? </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4 flex flex-col gap-0.5">
                <span>Weight: {formData.weight}kg</span>
                <div className="flex items-center space-x-2">
                    <Scales className="text-muted-foreground"/>
                    <Slider
                        id="weight"
                        min={40}
                        max={220}
                        defaultValue={[formData?.weight || 175]}
                        onValueChange={([value]) => {
                            updateFormData("weight", value as FormData["weight"]);
                        }}
                    />
                </div>
            </div>
        </CardContent>
    </Card>
);

export const FitnessLevelStep: React.FC<StepProps> = ({
                                                          formData,
                                                          updateFormData
                                                      }) => (
    <Card className="p-4">
        <CardHeader>
            <CardTitle className="text-xl font-bold text-center">What&apos;s
                your current fitness level?</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {[
                    {
                        level: "beginner",
                        hint: "Less than 3 months of experience",
                        icon: <Person className="mr-2 h-4 w-4"/>,
                    },
                    {
                        level: "intermediate",
                        hint: "3 months to 1 year of experience",
                        icon: <PersonSimpleRun className="mr-2 h-4 w-4"/>,
                    },
                    {
                        level: "advanced",
                        hint: "More than 1 year of experience",
                        icon: <Barbell className="mr-2 h-4 w-4"/>,
                    },
                ].map(({level, hint, icon}) => (
                    <div key={level}
                         className="flex flex-col items-center space-y-2">
                        <Button
                            variant={formData.fitnessLevel === level ? "solid" : "outline"}
                            onClick={() => updateFormData("fitnessLevel", level as FormData["fitnessLevel"])}
                            className="w-full flex items-center justify-center"
                        >
                            {icon}
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </Button>
                        <span
                            className="text-muted-foreground text-sm text-center">{hint}</span>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);