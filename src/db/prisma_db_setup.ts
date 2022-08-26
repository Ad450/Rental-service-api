import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function connectPrisma() {
  try {
    await prisma.$connect();
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
  }
}
