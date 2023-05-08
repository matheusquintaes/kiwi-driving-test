import PropTypes from 'prop-types'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

import { showLetterOption } from '../../utils'

function AnswerFeedback({
  questions,
  currentQuestion,
  userSelectedOptionSingle,
  userSelectedOptionsMultiple,
  userSubmittedAnswerCorrect
}) {
  const isMultipleAnswer = questions[currentQuestion].multipleAnswer

  const sortedUserSelectedOptions = userSelectedOptionsMultiple.sort(
    (a, b) => a.index - b.index
  )

  function showCorrectAnswerSingle() {
    function getAnswerByType(answerOptions) {
      return answerOptions.isCorrect === true
    }

    const answerOptions = questions[currentQuestion].answerOptions
    const result = answerOptions.findIndex(getAnswerByType)

    return showLetterOption(result)
  }

  function AnswerFeedbackSingle() {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        {userSubmittedAnswerCorrect ? (
          <div>
            <div className="flex items-center mb-2">
              <CheckCircleIcon className="h-8 w-8 text-green-500 mr-2" />
              <p className="text-base mr-2 font-bold text-green-500">Correct</p>
            </div>
            <p className="text-xs mb-2">
              You selected
              <b> {showLetterOption(userSelectedOptionSingle.index)}</b>
            </p>
            <p className="text-base">
              {questions[currentQuestion].resultHelper}
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center mb-2">
              <XCircleIcon className="h-8 w-8 text-red-500 mr-2" />
              <p className="text-base mr-2 font-bold text-red-500">Incorrect</p>
            </div>
            <p className="text-xs mb-2 text-gray-900 ">
              You selected
              <b> {showLetterOption(userSelectedOptionSingle.index)}</b>, the
              correct answer was
              <b> {showCorrectAnswerSingle()}</b>
            </p>
            <p className="text-base text-gray-900 ">
              {questions[currentQuestion].resultHelper}
            </p>
          </div>
        )}
      </div>
    )
  }

  function showCorrectAnswerMultiple() {
    const answerOptions = questions[currentQuestion].answerOptions

    let keysOfCorrectQuestions = []

    answerOptions.forEach(function callback(answer, index) {
      if (answer.isCorrect === true) {
        keysOfCorrectQuestions.push(index)
      }
    })

    keysOfCorrectQuestions.sort()
    return keysOfCorrectQuestions
  }

  function AnswerFeedbackMultiple() {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        {userSubmittedAnswerCorrect ? (
          <div>
            <div className="flex items-center mb-2">
              <CheckCircleIcon className="h-8 w-8 text-green-500 mr-2" />
              <p className="text-base mr-2">
                <b className=" font-bold">Correct.</b>
              </p>
            </div>
            <p className="text-xs mb-2">
              You selected {console.log(userSelectedOptionsMultiple)}
              {sortedUserSelectedOptions.map((options, key) => (
                <b key={key}> {showLetterOption(options.index)} </b>
              ))}
            </p>
            <p className="text-base">
              {questions[currentQuestion].resultHelper}
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center mb-2">
              <XCircleIcon className="h-8 w-8 text-red-500 mr-2" />
              <p className="text-base mr-2">
                <b className=" font-bold">Incorrect.</b>
              </p>
            </div>
            <p className="text-sm mb-2">
              You selected {console.log(userSelectedOptionsMultiple)}
              {sortedUserSelectedOptions.map((options, key) => (
                <b key={key}> {showLetterOption(options.index)} </b>
              ))}
              , the correct answer was
              {showCorrectAnswerMultiple().map((options, key) => (
                <b key={key}> {showLetterOption(options)}</b>
              ))}
            </p>

            <p>{questions[currentQuestion].resultHelper}</p>
          </div>
        )}
      </div>
    )
  }
  return (
    <div>
      {isMultipleAnswer ? <AnswerFeedbackMultiple /> : <AnswerFeedbackSingle />}
    </div>
  )
}

AnswerFeedback.propTypes = {
  currentQuestion: PropTypes.number,
  questions: PropTypes.array,
  userSelectedOptionSingle: PropTypes.object,
  userSelectedOptionsMultiple: PropTypes.array,
  userSubmittedAnswerCorrect: PropTypes.bool
}

export default AnswerFeedback
