import { ChallengeType, Difficulty, LanguageType, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    console.log("Start database seeding");

    await prisma.course.deleteMany();
    await prisma.challenge.deleteMany();


    const course = await prisma.course.create({
        data: {
            title: "Javascript",
            description: "Craft JavaScript interview questions",
            imageUrl: "/js.svg",
            languageType: LanguageType.JS
        },
    })

    await prisma.course.createMany({
        data: [
            {
                title: "Php",
                description: "Craft Php interview questions",
                imageUrl: "/php.svg",
                languageType: LanguageType.PHP
            },
            {
                title: "Java",
                description: "Craft Java interview questions",
                imageUrl: "/java.svg",
                languageType: LanguageType.JAVA
            },
            {
                title: "Golang",
                description: "Craft Golang interview questions",
                imageUrl: "/go.svg",
                languageType: LanguageType.GO
            },
        ]
    })


    await prisma.challenge.createMany({
        data: [
            {
                title: "JS interview question 1",
                code: `
(function() {
	'use Type Errorar person = {
		name: 'John'
	};
	person.salary = '10000$';
	person['country'] = 'USA';

	Object.defineProperty(person, 'phoneNo', {
		value: '8888888888',
		enumerable: true
	})

	console.log(Object.keys(person));
})();
                `,
                courseId: course.id,
                difficulty: Difficulty.EASY,
                order: 1,
                question: "What is javascript?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                title: "JS interview question 1",

                courseId: course.id,
                difficulty: Difficulty.HARD,
                order: 2,
                question: "What is const in javascript?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                title: "JS interview question 1",

                courseId: course.id,
                difficulty: Difficulty.MEDIUM,
                order: 3,
                question: "What is scope in javascript",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                title: "JS interview question 1",

                courseId: course.id,
                difficulty: Difficulty.MEDIUM,
                order: 4,
                question: "What are closures in JavaScript?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                title: "JS interview question 1",

                courseId: course.id,
                difficulty: Difficulty.HARD,
                order: 5,
                question: "Explain event bubbling and event capturing in JavaScript.",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                title: "JS interview question 1",

                courseId: course.id,
                difficulty: Difficulty.EASY,
                order: 6,
                question: "What is a ternary operator in JavaScript?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                title: "JS interview question 1",

                courseId: course.id,
                difficulty: Difficulty.MEDIUM,
                order: 7,
                question: "What is the purpose of the 'use strict' directive in JavaScript?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                title: "JS interview question 1",

                courseId: course.id,
                difficulty: Difficulty.HARD,
                order: 8,
                question: "Explain the concept of prototypal inheritance in JavaScript.",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                title: "JS interview question 1",

                courseId: course.id,
                difficulty: Difficulty.EASY,
                order: 9,
                question: "What is the difference between 'null' and 'undefined' in JavaScript?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                title: "JS interview question 1",

                courseId: course.id,
                difficulty: Difficulty.HARD,
                order: 10,
                question: "Explain what AJAX is and how it works.",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                title: "JS interview question 1",

                courseId: course.id,
                difficulty: Difficulty.MEDIUM,
                order: 11,
                question: "What are the different ways to create objects in JavaScript?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                title: "JS interview question 1",

                courseId: course.id,
                difficulty: Difficulty.HARD,
                order: 12,
                question: "What is the event loop in JavaScript and how does it work?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                title: "JS interview question 1",

                courseId: course.id,
                difficulty: Difficulty.EASY,
                order: 13,
                question: "What is the purpose of the 'this' keyword in JavaScript?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
        ]
    });


    await prisma.challengeOption.createMany({
        data: [
            {
                challengeId: 1,
                text: "Type Error",
                correct: false
            },
            {
                challengeId: 1,
                text: "undefined",
                correct: false
            },
            {
                challengeId: 1,
                text: `["name", "salary", "country", "phoneNo"]`,
                correct: false
            },
            {
                challengeId: 1,
                text: `["name", "salary", "country"]`,
                correct: true
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