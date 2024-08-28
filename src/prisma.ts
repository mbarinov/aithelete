import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient;
}

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
};

const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ['query'],
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// @ts-ignore
BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
};

export default prisma;
