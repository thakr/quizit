import React, { useState } from 'react'
import { auth } from '@/auth';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import MyQuizzesPage from '../components/MyQuizzesPage';
import {  getUserQuizzes } from '../lib/actions';
import { QuizWithQuestionsAndResponses } from '../types';

export default async function page() {
    const session = await auth() as Session;
    let quizzes: QuizWithQuestionsAndResponses[] = [];
    if (session && session.user?.id) {
        quizzes = await getUserQuizzes(session.user.id);
    } else {
        redirect('/login?redirect=/my-quizzes')
    }
    return (
       <MyQuizzesPage quizzes={quizzes} session={session}/>
    )
}
