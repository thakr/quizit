'use server'
import prisma from './prisma'
import { QuizWithQuestions } from '../types';
export async function handleForm(formData: FormData) {
    if (formData.get("answer")) {
        console.log(formData.get("answer"))
        await new Promise(r => setTimeout(r, 2000));
    }
}
export async function getQuiz(id: string) {
    const feed = await prisma.quiz.findUnique({
      where: {id: id},
      include: {
        questions: {
          omit: { answer: true }
        }
      }
    })
    return feed;
}