import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    console.log("Start database seeding");

    const course = await prisma.course.create({
        data: {
            title: "Javascript",
            description: "Craft JavaScript interview questions",
            imageUrl: "skill-icons:javascript"
        },
    })

    await prisma.course.createMany({
        data: [
            {
                title: "Php",
                description: "Craft Php interview questions",
                imageUrl: "skill-icons:php-dark"
            },
            {
                title: "Java",
                description: "Craft Java interview questions",
                imageUrl: "skill-icons:java-dark"
            },
            {
                title: "Golang",
                description: "Craft Golang interview questions",
                imageUrl: "skill-icons:golang"
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