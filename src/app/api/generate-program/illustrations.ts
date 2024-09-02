export function getIllustrationsByExercise(exercise: string): string[] {
    switch (exercise) {
        case "Bench Press":
            return ["https://storage.googleapis.com/aithelete/Bench%20Press.jpeg"];
        case "Squat":
            return ["https://storage.googleapis.com/aithelete/squats.jpeg"];
        case "Deadlift":
            return ["https://storage.googleapis.com/aithelete/deadlift..jpeg"];
        case "Pull-Up":
            return ["https://storage.googleapis.com/aithelete/pull-up.jpg"];
        case "Pull-Up (Assisted)":
            return ["https://storage.googleapis.com/aithelete/pull-ups-assisted.jpeg"];
        case "Overhead Press":
            return ["https://storage.googleapis.com/aithelete/Overhead-Press.jpeg"];
        case "Bicep Curl":
            return ["https://storage.googleapis.com/aithelete/Bicep%20Curl.jpg"];
        case "Leg Press":
            return ["https://storage.googleapis.com/aithelete/Leg%20Press.jpg"];
        case "Lunge":
            return ["https://storage.googleapis.com/aithelete/Lunge.png"];
        case "Plank":
            return ["https://storage.googleapis.com/aithelete/Plank.jpeg"];
        case "Crunch":
            return ["https://storage.googleapis.com/aithelete/Crunch.png"];
        case "Leg Raise":
            return ["https://storage.googleapis.com/aithelete/Leg%20Raise.jpg"];
        case "Dumbbell Fly":
            return ["https://storage.googleapis.com/aithelete/Dumbbell%20Fly.jpeg"];
        case "Lat Pulldown":
            return ["https://storage.googleapis.com/aithelete/Lat%20Pulldown.jpg"];
        case "Russian Twist":
            return ["https://storage.googleapis.com/aithelete/Russian%20Twist.jpg"];
        case "Seated Row":
            return ["https://storage.googleapis.com/aithelete/Seated%20Row.jpg"];
        case "Cable Tricep Pushdown":
            return ["https://storage.googleapis.com/aithelete/Cable%20Tricep%20Pushdown.jpg"];
        case "Leg Curl":
            return ["https://storage.googleapis.com/aithelete/Leg%20Curl.jpeg"];
        case "Leg Extension":
            return ["https://storage.googleapis.com/aithelete/Leg%20Extension.png"];
        default:
            return [];
    }
}
