import type {Metadata} from 'next';
import { redirect } from 'next/navigation';
import {auth} from "@/auth";
import prisma from "@/prisma";
import {CreateForm} from './form';

export const metadata: Metadata = {
    title: "Create a Program  | AIthelete",
    description: "Create your personalized AI training program based on your fitness level and goals.",
}

export default async function CreatePage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect("/login");
    }

    const payload = await prisma.user.findUnique({
        where: {
            email: session.user.email
        },
        select:{
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
            trainingProgram:true,
        }
    });

    if(payload?.trainingProgram) {
        redirect("/home");
    }

    return <CreateForm/>;
}