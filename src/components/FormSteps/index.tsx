import {Slider} from "@/components/ui/slider";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
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

export const SexStep: React.FC<StepProps> = ({formData, updateFormData}) => (
    <Card className="p-4">
        <CardHeader>
            <CardTitle className="text-xl font-bold text-center">
                What&apos;s your biological sex?</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="flex space-x-4 justify-center">
                    {["male", "female", "other"].map((sex) => (
                        <Button
                            key={sex}
                            variant={formData.sex === sex ? "default" : "outline"}
                            onClick={() => updateFormData("sex", sex as FormData["sex"])}
                        >
                            {sex === "male" &&
                                <GenderMale className="mr-2 h-4 w-4"/>}
                            {sex === "female" &&
                                <GenderFemale className="mr-2 h-4 w-4"/>}
                            {sex === "other" &&
                                <GenderIntersex className="mr-2 h-4 w-4"/>}
                            {sex.charAt(0).toUpperCase() + sex.slice(1)}
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
                                                          updateFormData,
                                                      }) => (
    <Card className="p-4">
        <CardHeader>
            <CardTitle className="text-xl font-bold text-center">
                What&apos;s your current fitness level?
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {[
                    {
                        level: "beginner",
                        hint: "Less than 3 months of experience",
                        icon: <Person className="mr-2 h-4 w-4" />,
                    },
                    {
                        level: "intermediate",
                        hint: "3 months to 1 year of experience",
                        icon: <PersonSimpleRun className="mr-2 h-4 w-4" />,
                    },
                    {
                        level: "advanced",
                        hint: "More than 1 year of experience",
                        icon: <Barbell className="mr-2 h-4 w-4" />,
                    },
                ].map(({level, hint, icon}) => (
                    <div key={level} className="flex items-center space-x-2">

                        <Button
                            variant={formData.fitnessLevel === level ? "default" : "outline"}
                            onClick={() => updateFormData("fitnessLevel", level as FormData["fitnessLevel"])}
                            className="flex items-center"
                        >
                            {icon}
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </Button>
                        <span
                            className="text-muted-foreground text-sm">{hint}</span>

                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);