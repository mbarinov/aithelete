'use client'

import {useState} from 'react'
import {Button} from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {Copy, Check, Share2} from "lucide-react"

interface SharePageProps {
    programId: string
    programName: string
    programDescription: string
}

export function SharePage({programId, programName, programDescription}: SharePageProps) {
    const [isMarkdownCopied, setIsMarkdownCopied] = useState<boolean>(false)
    const [isShared, setIsShared] = useState<boolean>(false)

    const handleShare = async () => {
        try {
            const response = await fetch(`/api/markdown?id=${programId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch markdown');
            }
            const data = await response.json();
            const markdownText = data.markdown;

            await navigator.share({
                title: programName,
                text: markdownText,
            })
        } catch (error) {
            console.error('Error sharing program:', error)
        }
    }

    const handleCopyMarkdown = async () => {
        try {
            const response = await fetch(`/api/markdown?id=${programId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch markdown');
            }
            const data = await response.json();
            const markdownText = data.markdown;

            await navigator.clipboard.writeText(markdownText);
            setIsShared(true);
        } catch (error) {
            console.error('Error copying markdown:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl dark:bg-gray-900 dark:text-white">
            <h1 className="text-3xl font-bold mb-2 dark:text-white">{programName}</h1>
            <p className="text-muted-foreground mb-6 dark:text-gray-400">{programDescription}</p>

            <div className="space-y-6">
                <Card className="dark:bg-gray-800 dark:text-white">
                    <CardHeader>
                        <CardTitle>Share</CardTitle>
                        <CardDescription>Share your training program as formatted
                            Markdown text</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button onClick={handleShare} className="dark:bg-gray-700 dark:text-white">
                            {isShared ? (
                                <>
                                    <Check className="mr-2 h-4 w-4"/>
                                    Shared!
                                </>
                            ) : (
                                <>
                                    <Share2 className="mr-2 h-4 w-4"/>
                                    Share
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="dark:bg-gray-800 dark:text-white">
                    <CardHeader>
                        <CardTitle>Copy as Markdown</CardTitle>
                        <CardDescription>Copy your training program as formatted
                            Markdown text</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button onClick={handleCopyMarkdown} className="dark:bg-gray-700 dark:text-white">
                            {isMarkdownCopied ? (
                                <>
                                    <Check className="mr-2 h-4 w-4"/>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="mr-2 h-4 w-4"/>
                                    Copy to Clipboard
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}