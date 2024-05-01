import { PrismaClient } from '@prisma/client';

const tableNames = ['Challenge', 'UserProgress'];

const prisma = new PrismaClient();
async function main() {
    for (const tableName of tableNames) await prisma.$queryRawUnsafe(`Truncate "${tableName}" restart identity cascade;`);
}

main().finally(async () => {
    await prisma.$disconnect();
});