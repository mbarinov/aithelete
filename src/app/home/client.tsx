"use client";

import {
    AwaitedReactNode, JSXElementConstructor,
    Key,
    ReactElement,
    ReactNode,
    ReactPortal,
} from 'react'
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {ScrollArea} from "@/components/ui/scroll-area"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion"
import {
    MoreVertical,
    Share2,
    RefreshCw,
    Dumbbell,
    Clock
} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import Link from 'next/link'
import {Footer} from "@/components/Footer"

interface HomeClientProps {
    trainingProgram: any
}

export function HomeClient({
                               trainingProgram
                           }: HomeClientProps) {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="sticky top-[57px] z-10 bg-background border-b">
                <div
                    className="container flex justify-between items-center py-4">
                    <h1 className="text-xl font-bold">{trainingProgram.programName}</h1>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-5 w-5"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <Link href="/edit">
                                <DropdownMenuItem>

                                    <RefreshCw className="mr-2 h-4 w-4"/>
                                    Re-generate Program
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/share">
                                <DropdownMenuItem>
                                    <Share2 className="mr-2 h-4 w-4"/>
                                    Share Program
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <main className="flex-grow container py-4">
                <Tabs defaultValue="0" className="mb-6">
                    <TabsList className="grid w-full grid-cols-3">
                        {trainingProgram.exercises.map((workout: {
                            id: Key | null | undefined;
                        }, index: number) => (
                            <TabsTrigger
                                key={workout.id}
                                value={index.toString()}
                            >
                                Day {index + 1}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {trainingProgram.exercises.map((workout: {
                        id: Key | null | undefined;
                        workoutName: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined;
                        workoutDescription: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined;
                        duration: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined;
                        caloriesBurned: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined;
                        exercises: any[];
                    }, index: { toString: () => string; }) => (
                        <TabsContent key={workout.id} value={index.toString()}>
                            <div className="mb-4">
                                <h2 className="text-2xl font-bold">{workout.workoutName}</h2>
                                <p className="text-sm text-muted-foreground">{workout.workoutDescription}</p>
                                <div
                                    className="flex items-center mt-2 text-sm text-muted-foreground">
                                    <Clock className="mr-2 h-4 w-4"/>
                                    <span>Duration: {workout.duration} minutes</span>
                                    <Dumbbell className="ml-4 mr-2 h-4 w-4"/>
                                    <span>Calories: {workout.caloriesBurned}</span>
                                </div>
                            </div>
                            <ScrollArea className="h-[calc(100vh-250px)]">
                                <div
                                    className="grid grid-cols-1 gap-4">
                                    {workout.exercises.map((exercise) => (
                                        <Card key={exercise.id}>
                                            <CardContent className="p-4">
                                                <Accordion type="single"
                                                           collapsible
                                                           className="w-full">
                                                    <AccordionItem
                                                        value={exercise.id}>
                                                        <AccordionTrigger>
                                                            <div
                                                                className="flex justify-between items-center w-full">
                                                                <span>{exercise.name}</span>
                                                                <span
                                                                    className="text-sm text-muted-foreground">
            {exercise.sets} x {exercise.reps} {exercise.weightAmount && `@ ${exercise.weightAmount}${exercise.weightUnit}`}
        </span>
                                                            </div>
                                                        </AccordionTrigger>
                                                        <AccordionContent>
                                                            <div
                                                                className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                                                <div
                                                                    className="space-y-4">
                                                                    <Image
                                                                        src="https://picsum.photos/300/200"
                                                                        alt={`${exercise.name} illustration`}
                                                                        width={300}
                                                                        height={200}
                                                                        className="h-48 object-cover rounded-md"
                                                                    />
                                                                    <p>{exercise.description}</p>
                                                                </div>
                                                                <div
                                                                    className="grid grid-cols-2 lg:grid-cols-1 gap-2 text-sm">
                                                                    <div>
                                                                        <span
                                                                            className="font-semibold">Category:</span> {exercise.category}
                                                                    </div>
                                                                    <div>
                                                                        <span
                                                                            className="font-semibold">Muscle Groups:</span> {exercise.muscleGroupCount}
                                                                    </div>
                                                                    <div>
                                                                        <span
                                                                            className="font-semibold">Sets:</span> {exercise.sets}
                                                                    </div>
                                                                    <div>
                                                                        <span
                                                                            className="font-semibold">Reps:</span> {exercise.reps}
                                                                    </div>
                                                                    {exercise.weightAmount && (
                                                                        <div>
                                                                            <span
                                                                                className="font-semibold">Weight:</span> {exercise.weightAmount} {exercise.weightUnit}
                                                                        </div>
                                                                    )}
                                                                    {exercise.assistWeightAmount && (
                                                                        <div>
                                                                            <span
                                                                                className="font-semibold">Assist Weight:</span> {exercise.assistWeightAmount} {exercise.assistWeightUnit}
                                                                        </div>
                                                                    )}
                                                                    <div>
                                                                        <span
                                                                            className="font-semibold">Duration:</span> {exercise.duration} minutes
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    ))}
                </Tabs>
            </main>

            <Footer/>
        </div>
    )
}