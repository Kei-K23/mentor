import { ChallengeType, Difficulty, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    console.log("Start database seeding");

    await prisma.course.deleteMany();
    await prisma.challenge.deleteMany();

    const course = await prisma.course.create({
        data: {
            title: "Javascript",
            description: "Craft JavaScript interview questions",
            imageUrl: "/js.svg"
        },
    })

    await prisma.course.createMany({
        data: [
            {
                title: "Php",
                description: "Craft Php interview questions",
                imageUrl: "/php.svg"
            },
            {
                title: "Java",
                description: "Craft Java interview questions",
                imageUrl: "/java.svg"
            },
            {
                title: "Golang",
                description: "Craft Golang interview questions",
                imageUrl: "/go.svg"
            },
        ]
    })

    await prisma.challenge.createMany({
        data: [
            {
                courseId: course.id,
                difficulty: Difficulty.EASY,
                order: 1,
                question: "What is javascript?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                courseId: course.id,
                difficulty: Difficulty.HEARD,
                order: 2,
                question: "What is const in javascript?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                courseId: course.id,
                difficulty: Difficulty.NORMAL,
                order: 3,
                question: "What is scope in javascript",
                type: ChallengeType.MULTIPLE_CHOICE
            },
        ]
    })

    console.log("Database seeding finished");
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })