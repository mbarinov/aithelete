import {redirect} from 'next/navigation';
import {auth} from "@/auth";
import prisma from "@/prisma";

import { SharePage} from "./client";

export default async function HomePage() {
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
            trainingProgram: {
                select: {
                    id: true,
                    programName: true,
                    programDescription: true,
                    createdAt: true,
                }
            }
        }
    });

    if (!payload) {
        redirect("/login");
    }

    const hasTrainingProgram = payload.trainingProgram !== null;

    if (!hasTrainingProgram || !payload.trainingProgram) {
        redirect("/create");
    }

    return (
        <SharePage programId={payload.trainingProgram?.id} programName={payload.trainingProgram?.programName} programDescription={payload.trainingProgram?.programDescription}/>
    )
}