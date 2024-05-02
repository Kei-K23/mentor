import { db } from '@/db';
import { ChallengeType, Difficulty, LanguageType, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    console.log("Start database seeding");

    await prisma.course.deleteMany();
    await prisma.challenge.deleteMany();


    const cours1 = await prisma.course.create({
        data: {
            title: "Javascript",
            description: "Craft JavaScript interview questions",
            imageUrl: "/js.svg",
            languageType: LanguageType.JS
        },
    })
    const cours2 = await prisma.course.create({
        data: {
            title: "Php",
            description: "Craft Php interview questions",
            imageUrl: "/php.svg",
            languageType: LanguageType.PHP
        },
    })
    const cours3 = await prisma.course.create({
        data: {
            title: "Java",
            description: "Craft Java interview questions",
            imageUrl: "/java.svg",
            languageType: LanguageType.JAVA
        },
    })
    const cours4 = await prisma.course.create({
        data: {
            title: "Golang",
            description: "Craft Golang interview questions",
            imageUrl: "/go.svg",
            languageType: LanguageType.GO
        },
    })

    await prisma.challenge.createMany({
        data: [
            {
                title: "JS interview question 1",
                code: `
(function() {
	'use strict';

	var person = {
		name: 'John'
	};
	person.salary = '10000$';
	person['country'] = 'USA';

	Object.defineProperty(person, 'phoneNo', {
		value: '8888888888',
		enumerable: false
	})

	console.log(Object.keys(person));
})();
                `,
                courseId: cours1.id,
                difficulty: Difficulty.EASY,
                order: 1,
                question: "What would be the output of following code ?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                title: "JS interview question 2",
                courseId: cours1.id,
                difficulty: Difficulty.HARD,
                order: 2,
                question: "What would be the output of following code ?",
                code: `
(function() {
	var objA = {
		foo: 'foo',
		bar: 'bar'
	};
	var objB = {
		foo: 'foo',
		bar: 'bar'
	};
	console.log(objA == objB);
	console.log(objA === objB);
}());
                `,
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                title: "JS interview question 3",
                courseId: cours1.id,
                difficulty: Difficulty.MEDIUM,
                order: 3,
                question: "What would be the output of following code ?",
                code: `
(function() {
	var objA = new Object({foo: "foo"});
	var objB = new Object({foo: "foo"});
	console.log(objA == objB);
	console.log(objA === objB);
}());
                `,
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
            {
                challengeId: 2,
                text: "false true",
                correct: false
            },
            {
                challengeId: 2,
                text: "false false",
                correct: true
            },
            {
                challengeId: 2,
                text: "true false",
                correct: false
            },
            {
                challengeId: 2,
                text: "true true",
                correct: false
            },
            {
                challengeId: 3,
                text: "false true",
                correct: false
            },
            {
                challengeId: 3,
                text: "false false",
                correct: true
            },
            {
                challengeId: 3,
                text: "true false",
                correct: false
            },
            {
                challengeId: 3,
                text: "true true",
                correct: false
            },
        ]
    })

    await prisma.challenge.createMany({
        data: [
            {
                title: "PHP Interview Question 1",
                code: `
<?php
$a = "1";
$b = "2";
echo $a + $b;
?>
                `,
                courseId: cours2.id,
                difficulty: Difficulty.EASY,
                order: 1,
                question: "What will be the output of the following PHP code?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                title: "PHP Interview Question 2",
                code: `
<?php
$a = 10;
$b = 20;
$a += $b;
echo $a;
?>

                `,
                courseId: cours2.id,
                difficulty: Difficulty.HARD,
                order: 2,
                question: "What will be the output of the following PHP code?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                title: "PHP Interview Question 3",
                code: `
<?php
$a = 10;
$b = '10';
if ($a == $b) {
    echo "Equal";
} else {
    echo "Not Equal";
}
?>
                `,
                courseId: cours2.id,
                difficulty: Difficulty.MEDIUM,
                order: 3,
                question: "What will be the output of the following PHP code?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
        ]
    });

    await prisma.challengeOption.createMany({
        data: [
            {
                challengeId: 4,
                text: "3",
                correct: false
            },
            {
                challengeId: 4,
                text: "12",
                correct: false
            },
            {
                challengeId: 4,
                text: "1",
                correct: false
            },
            {
                challengeId: 4,
                text: "TypeError",
                correct: true
            },
            {
                challengeId: 5,
                text: "20",
                correct: false
            },
            {
                challengeId: 5,
                text: "30",
                correct: false
            },
            {
                challengeId: 5,
                text: "10",
                correct: true
            },
            {
                challengeId: 5,
                text: "Error",
                correct: false
            },
            {
                challengeId: 6,
                text: "Equal",
                correct: true
            },
            {
                challengeId: 6,
                text: "Not Equal",
                correct: false
            },
            {
                challengeId: 6,
                text: "True",
                correct: false
            },
            {
                challengeId: 6,
                text: "False",
                correct: false
            },
        ]
    });


    await prisma.challenge.createMany({
        data: [
            {
                title: "Java Interview Question 1",
                code: `
public class Main {
    public static void main(String[] args) {
        String str1 = new String("Hello");
        String str2 = new String("Hello");
        System.out.println(str1 == str2);
    }
}
                `,
                courseId: cours3.id,
                difficulty: Difficulty.EASY,
                order: 1,
                question: "What will be the output of the following Java code?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                title: "Java Interview Question 2",
                code: `
public class Main {
    public static void main(String[] args) {
        String str1 = new String("Hello");
        String str2 = str1.intern();
        System.out.println(str1 == str2);
    }
}
                `,
                courseId: cours3.id,
                difficulty: Difficulty.HARD,
                order: 2,
                question: "What will be the output of the following Java code?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                title: "Java Interview Question 3",
                code: `
public class Main {
    public static void main(String[] args) {
        String str1 = "Hello";
        String str2 = "Hello";
        System.out.println(str1 == str2);
    }
}
                `,
                courseId: cours3.id,
                difficulty: Difficulty.MEDIUM,
                order: 3,
                question: "What will be the output of the following Java code?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
        ]
    });

    await prisma.challengeOption.createMany({
        data: [
            {
                challengeId: 7,
                text: "true",
                correct: false
            },
            {
                challengeId: 7,
                text: "false",
                correct: true
            },
            {
                challengeId: 8,
                text: "true",
                correct: true
            },
            {
                challengeId: 8,
                text: "false",
                correct: false
            },
            {
                challengeId: 9,
                text: "true",
                correct: true
            },
            {
                challengeId: 9,
                text: "false",
                correct: false
            },
        ]
    });


    await prisma.challenge.createMany({
        data: [
            {
                title: "Go Interview Question 1",
                code:
                    `
package main

import (
	"fmt"
)

func main() {
	nums := []int{1, 2, 3, 4, 5}
	fmt.Println(nums[1:3])
}`,
                courseId: cours4.id,
                difficulty: Difficulty.EASY,
                order: 1,
                question: "What will be the output of the following Go code?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                title: "Go Interview Question 2",
                code: `
package main

import (
	"fmt"
)

func main() {
	nums := [...]int{1, 2, 3, 4, 5}
	fmt.Println(len(nums))
}`,
                courseId: cours4.id,
                difficulty: Difficulty.MEDIUM,
                order: 2,
                question: "What will be the output of the following Go code?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
            {
                title: "Go Interview Question 3",
                code: `
package main

import (
	"fmt"
)

func main() {
	var x *int
	fmt.Println(x)
}`,
                courseId: cours4.id,
                difficulty: Difficulty.HARD,
                order: 3,
                question: "What will be the output of the following Go code?",
                type: ChallengeType.MULTIPLE_CHOICE
            },
        ]
    });

    await prisma.challengeOption.createMany({
        data: [
            {
                challengeId: 10,
                text: "[2 3]",
                correct: true
            },
            {
                challengeId: 10,
                text: "[1 2]",
                correct: false
            },
            {
                challengeId: 10,
                text: "[2 3 4]",
                correct: false
            },
            {
                challengeId: 10,
                text: "[1 2 3]",
                correct: false
            },
            {
                challengeId: 11,
                text: "5",
                correct: true
            },
            {
                challengeId: 11,
                text: "4",
                correct: false
            },
            {
                challengeId: 11,
                text: "Compilation Error",
                correct: false
            },
            {
                challengeId: 11,
                text: "Runtime Error",
                correct: false
            },
            {
                challengeId: 12,
                text: "nil",
                correct: true
            },
            {
                challengeId: 12,
                text: "0x0",
                correct: false
            },
            {
                challengeId: 12,
                text: "panic: runtime error: invalid memory address or nil pointer dereference",
                correct: false
            },
            {
                challengeId: 12,
                text: "Compilation Error",
                correct: false
            },
        ]
    });

    await db.quest.createMany({
        data: [
            {
                title: "Earn 20 xp",
                points: 20,
            },
            {
                title: "Earn 50 xp",
                points: 50,
            },
            {
                title: "Earn 100 xp",
                points: 100,
            },
            {
                title: "Earn 500 xp",
                points: 500,
            },
            {
                title: "Earn 1000 xp",
                points: 1000,
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