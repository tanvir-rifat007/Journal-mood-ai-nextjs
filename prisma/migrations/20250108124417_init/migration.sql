/*
  Warnings:

  - Added the required column `color` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mood` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `negative` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentimentScore` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `song` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `Analysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "mood" TEXT NOT NULL,
ADD COLUMN     "negative" BOOLEAN NOT NULL,
ADD COLUMN     "sentimentScore" INTEGER NOT NULL,
ADD COLUMN     "song" TEXT NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL;
