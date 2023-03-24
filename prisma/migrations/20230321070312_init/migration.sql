/*
  Warnings:

  - You are about to alter the column `hourPerSession` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "hourPerSession" SET DATA TYPE INTEGER;
