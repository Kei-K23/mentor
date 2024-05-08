import { ChallengeType, Difficulty, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    console.log("Start database seeding");

    const challenge = await prisma.challenge.create({
        data:
        {
            title: "JS interview question 12",
            code: `
(function(){
	var animal = ['cow','horse'];
		animal.push('cat');
		animal.push('dog','rat','goat');
		console.log(animal.length);
})();
                `,
            courseId: 41,
            difficulty: Difficulty.MEDIUM,
            order: 12,
            question: "What would be the output of following code ?",
            type: ChallengeType.MULTIPLE_CHOICE
        },
    }
    );

    await prisma.challengeOption.createMany({
        data: [
            {
                challengeId: challenge.id,
                text: "11",
                correct: false
            },
            {
                challengeId: challenge.id,
                text: "5",
                correct: false
            },
            {
                challengeId: challenge.id,
                text: `6`,
                correct: true
            },
            {
                challengeId: challenge.id,
                text: "undefined",
                correct: false
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

