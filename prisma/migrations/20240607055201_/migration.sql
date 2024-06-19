/*
  Warnings:

  - You are about to drop the column `answers` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the column `quizId` on the `Response` table. All the data in the column will be lost.
  - Added the required column `answer` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_quizId_fkey";

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "answers",
DROP COLUMN "quizId",
ADD COLUMN     "answer" TEXT NOT NULL,
ADD COLUMN     "questionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
