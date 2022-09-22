import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import client from '../../graphql/client'
import { GET_QUESTIONS_BY_SUBJECT } from '../../graphql/queries'
import { AppStateContext } from '../../contexts/appStateContext'
import {
  shuffleArray,
  getCorrectAnswersOfMultipleQuestion,
  checkUserAnswersWithCorrectAnswers
} from '../../utils/index'

import AnswerFeedback from '../AnswerFeedback'
import AnswersOptionsList from '../AnswersOptionsList'
import Results from '../Results'

function Questions() {
  const { questions, setQuestions, gameState, setGameState, score, setScore } =
    useContext(AppStateContext)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userSelectedOptionSingle, setUserSelectedOptionSingle] = useState({})
  const [userSelectedOptionsMultiple, setUserSelectedOptionsMultiple] =
    useState([])
  const [userSubmittedAnswer, setUserSubmittedAnswer] = useState({
    submited: false,
    correct: false
  })

  const { subject } = useParams()

  const handleSubmitButtonClick = () => {
    const isMultipleAsnwer = questions[currentQuestion].multipleAnswer

    isMultipleAsnwer && handleSubmitMultiple()
    !isMultipleAsnwer && handleSimpleQuestion()

    function handleSubmitMultiple() {
      const currentQuestionAnswerOptions =
        questions[currentQuestion].answerOptions
      const correctAnswers = getCorrectAnswersOfMultipleQuestion(
        currentQuestionAnswerOptions
      )

      if (
        checkUserAnswersWithCorrectAnswers(
          correctAnswers,
          userSelectedOptionsMultiple
        )
      ) {
        setUserSubmittedAnswer({ submited: true, correct: true })
        setScore(score + 1)
      } else {
        setUserSubmittedAnswer({ submited: true, correct: false })
      }
    }

    function handleSimpleQuestion() {
      if (userSelectedOptionSingle.isCorrect) {
        setUserSubmittedAnswer({ submited: true, correct: true })
        setScore(score + 1)
      } else {
        setUserSubmittedAnswer({ submited: true, correct: false })
      }
    }
  }

  const handleNextButtonClick = () => {
    const isMultipleAsnwer = questions[currentQuestion].multipleAnswer
    isMultipleAsnwer && setUserSelectedOptionsMultiple([])
    !isMultipleAsnwer && setUserSelectedOptionSingle({})
    setUserSubmittedAnswer({
      submited: false,
      correct: false
    })
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setGameState('finished')
    }
  }

  const showSubmitButton = () => {
    if (
      (Object.keys(userSelectedOptionSingle).length > 0 ||
        userSelectedOptionsMultiple.length) &&
      userSubmittedAnswer.submited === false
    ) {
      return true
    }
  }
  useEffect(() => {
    const fetchQuestions = async (subject) => {
      const { questions } = await client.request(GET_QUESTIONS_BY_SUBJECT, {
        title: subject
      })

      questions.forEach((question) => shuffleArray(question.answerOptions))
      setQuestions(shuffleArray(questions))
    }
    fetchQuestions(subject)
  }, [])
  return (
    <>
      {gameState === 'finished' ? (
        <Results />
      ) : (
        <div>
          {questions && (
            <div className="max-w-lg">
              <div className="bg-white shadow-md rounded-lg mb-8 p-4 flex justify-center flex-col">
                <p className="text-gray-900 font-semibold text-base mb-4">
                  Question {currentQuestion + 1}/
                </p>
                {questions[currentQuestion].image && (
                  <img
                    className="rounded-lg mb-4 max-w-lg"
                    src={questions[currentQuestion].image.url}
                    alt=""
                  />
                )}
                <p className="text-base">
                  {questions && questions[currentQuestion].questionText}
                </p>
              </div>

              <AnswersOptionsList
                questions={questions}
                currentQuestion={currentQuestion}
                userSelectedOptionsMultiple={userSelectedOptionsMultiple}
                setUserSelectedOptionsMultiple={setUserSelectedOptionsMultiple}
                userSubmittedAnswer={userSubmittedAnswer}
                userSelectedOptionSingle={userSelectedOptionSingle}
                setUserSelectedOptionSingle={setUserSelectedOptionSingle}
              />

              {userSubmittedAnswer.submited === true && (
                <AnswerFeedback
                  questions={questions}
                  currentQuestion={currentQuestion}
                  userSelectedOptionsMultiple={userSelectedOptionsMultiple}
                  userSelectedOptionSingle={userSelectedOptionSingle}
                  userSubmittedAnswerCorrect={userSubmittedAnswer.correct}
                />
              )}
              {showSubmitButton() && (
                <button
                  onClick={() => handleSubmitButtonClick()}
                  className="text-white bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3 py-2 text-center inline-flex items-center"
                >
                  Submit
                </button>
              )}
              {userSubmittedAnswer.submited === true && (
                <button
                  onClick={() => handleNextButtonClick()}
                  className="text-white bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3 py-2 text-center inline-flex items-center"
                >
                  Next
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Questions
