import React from 'react';

function Faq({isAnswer, setIsAnswer, question, questionsAndAnswers}) {

    const showAnswer = ()=>{
        setIsAnswer({...isAnswer, [question]:!isAnswer[question]})

    }

    return (
        <div className='flex flex-col items-start mb-8 border mx-auto p-1 rounded-md faq-item'>
            <div onClick={showAnswer} className='font-600 font-normal flex gap-3 items-center w-full cursor-pointer'><i className={`fas fa-${isAnswer[question] ? "minus":"plus"}`}/><span>{questionsAndAnswers.question}</span></div>
            
            {isAnswer[question] &&
                <p className='text-left mt-2'>
                    {questionsAndAnswers.answer}
                </p>
            }
        </div>
    );
}

export default Faq;