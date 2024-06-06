import QuizPage from '@/app/components/QuizPage';
import { getQuiz } from '@/app/lib/actions';

import React from 'react';

// Use the Quiz type as the type of quiz prop
export default async function Page({ params }: { params: { id: string } }) {
    const quiz = await getQuiz(params.id);
    return (
      <>
        {quiz ? <QuizPage quiz={quiz}/> : <p>Not found</p>}
      </>
    )
}