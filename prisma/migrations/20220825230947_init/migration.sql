-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "startDate" TEXT,
    "endDate" TEXT,
    "rented" BOOLEAN NOT NULL DEFAULT false,
    "rentedBy" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
