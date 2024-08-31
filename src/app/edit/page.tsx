import type {Metadata} from 'next';
import {redirect} from 'next/navigation';
import {auth} from "@/auth";
import prisma from "@/prisma";
import {ProgramForm} from '@/components/ProgramForm'
import type {FormData} from "@/types/formTypes";
import {Footer} from "@/components/Footer";

export const metadata: Metadata = {
    title: "Update your program  | AIthelete",
    description: "Update your personalized AI training program based on your fitness level and goals.",
}

export default async function EditProgramPage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect("/login");
    }

    const payload = await prisma.user.findUnique({
        where: {
            email: session.user.email
        },
        select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
            profile: {
                select: {
                    age: true,
                    weight: true,
                    height: true,
                    fitnessLevel: true,
                    gender: true,
                }
            },
            trainingProgram: {select: {id: true}},
        }
    });

    if (!payload?.trainingProgram) {
        redirect("/create");
    }

    const userProfile = payload.profile as FormData;

    return (
        <>
            <ProgramForm userProfile={userProfile}>
            <h2 className="text-2xl font-bold text-center">
                🏋️‍♀️ AIthelete 🏃‍♂️
            </h2>
            <p className="text-center">
                Update your personalized AI-powered training program in just a few
                steps! 🚀
            </p>
            </ProgramForm>
            <Footer/>
        </>
    );
}