import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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

function Questions() {
  const { questions, setQuestions, setGameState, score, setScore } =
    useContext(AppStateContext)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userSelectedOptionSingle, setUserSelectedOptionSingle] = useState({})
  const [userSelectedOptionsMultiple, setUserSelectedOptionsMultiple] =
    useState([])
  const [userSubmittedAnswer, setUserSubmittedAnswer] = useState({
    submited: false,
    correct: false
  })
  const [loading, setLoading] = useState(true)

  const { subject } = useParams()
  const navigate = useNavigate()

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
      navigate(`/questions/${subject}/results`)
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
      setLoading(false)
    }
    fetchQuestions(subject)
  }, [])

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        questions && (
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900">
              Question {currentQuestion + 1} / {questions.length}
            </h3>

            <div className="bg-white shadow-md rounded-lg mb-8 p-4 flex flex-col items-center">
              {questions[currentQuestion].image && (
                <img
                  className="rounded-lg mb-4 max-w-lg items-center"
                  src={questions[currentQuestion].image.url}
                  alt=""
                />
              )}
              <p className="text-lg text-gray-900 font-bold">
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
        )
      )}
    </>
  )
}

export default Questions
