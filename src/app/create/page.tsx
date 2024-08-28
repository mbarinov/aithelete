import type {Metadata} from 'next';
import { redirect } from 'next/navigation';
import {auth} from "@/auth";
import {CreateForm} from './form';

export const metadata: Metadata = {
    title: "Create a Program  | AIthelete",
    description: "Create your personalized AI training program based on your fitness level and goals.",
}

export default async function CreatePage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return <CreateForm/>;
}