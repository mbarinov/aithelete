import prisma from "@/prisma";
import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts, PDFFont } from 'pdf-lib';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
        return Response.json({ error: 'Invalid data format or other error' }, { status: 400 });
    }

    const payload = await prisma.trainingProgram.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            programName: true,
            programDescription: true,
            createdAt: true,
            exercises: {
                select: {
                    id: true,
                    workoutName: true,
                    workoutDescription: true,
                    duration: true,
                    exercises: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            category: true,
                            muscleGroupCount: true,
                            sets: true,
                            reps: true,
                            weightAmount: true,
                            weightUnit: true,
                        }
                    }
                }
            }
        }
    });

    try {
        const pdfDoc = await PDFDocument.create();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        let page = pdfDoc.addPage([595.28, 841.89]); // A4 size
        const { width, height } = page.getSize();

        // Cover Page
        const title = "AIthelete Training Program";
        const subtitle = payload?.programName || "Custom Program";

        page.drawText(title, {
            x: 50,
            y: height - 100,
            size: 28,
            font: boldFont,
            color: rgb(0, 0, 0),
        });

        // Adjusting the starting position for the subtitle
        let subtitleYOffset = height - 150; // Provide more space by starting lower

        // Drawing the subtitle or program overview
        page.drawText(subtitle, {
            x: 50,
            y: subtitleYOffset,
            size: 22,
            font: font,
            color: rgb(0.2, 0.2, 0.2),
            maxWidth: width - 100, // Ensuring it fits within the page width
            lineHeight: 26, // Adding line height for multi-line subtitles
        });

        subtitleYOffset -= 40; // Move yOffset for the overview text

        // Program Overview
        if (payload?.programDescription) {
            const description = `Overview: ${payload.programDescription}`;
            const maxWidth = width - 100; // Width to wrap the text
            const fontSize = 12;
            const lineHeight = 16;

            // Wrap and draw the description text
            const lines = wrapText(description, font, fontSize, maxWidth);
            lines.forEach(line => {
                page.drawText(line, {
                    x: 50,
                    y: subtitleYOffset,
                    size: fontSize,
                    font: font,
                    color: rgb(0, 0, 0),
                });
                subtitleYOffset -= lineHeight;
            });
        }

        // Loop through workouts
        let yOffset = subtitleYOffset - 30; // Provide space before starting workouts
        payload?.exercises.forEach((workout, index) => {
            if (yOffset < 100) {
                page = pdfDoc.addPage([595.28, 841.89]);
                yOffset = height - 50;
            }

            page.drawText(`Day ${index + 1}: ${workout.workoutName}`, {
                x: 50,
                y: yOffset,
                size: 16,
                font: boldFont,
                color: rgb(0, 0, 0),
            });

            yOffset -= 30;

            workout.exercises.forEach((exercise) => {
                if (yOffset < 50) {
                    page = pdfDoc.addPage([595.28, 841.89]);
                    yOffset = height - 50;
                }

                const exerciseText = `- ${exercise.name}: ${exercise.sets} sets x ${exercise.reps} reps${exercise.weightAmount ? ` @ ${exercise.weightAmount} ${exercise.weightUnit}` : ''}`;
                page.drawText(exerciseText, {
                    x: 70,
                    y: yOffset,
                    size: 12,
                    font: font,
                    color: rgb(0.1, 0.1, 0.1),
                });

                yOffset -= 20;
            });

            yOffset -= 20;
        });

        const pdfBytes = await pdfDoc.save();

        return new NextResponse(pdfBytes, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="training_program.pdf"',
            }
        });
    } catch (error) {
        console.log(error);
        return Response.json({ error: 'An error occurred during PDF generation' }, { status: 500 });
    }
}

// Utility function to wrap text based on max width and font size
function wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let line = '';

    words.forEach(word => {
        const testLine = line + word + ' ';
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (testWidth > maxWidth && line !== '') {
            lines.push(line.trim());
            line = word + ' ';
        } else {
            line = testLine;
        }
    });

    if (line) {
        lines.push(line.trim());
    }

    return lines;
}
