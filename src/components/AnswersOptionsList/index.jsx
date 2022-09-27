// import { useState } from 'react'
import { showLetterOption } from '../../utils/index'
import PropTypes from 'prop-types'

function AnswersOptionsList({
  questions,
  currentQuestion,
  userSelectedOptionSingle,
  setUserSelectedOptionSingle,
  userSelectedOptionsMultiple,
  setUserSelectedOptionsMultiple,
  userSubmittedAnswer
}) {
  const isMultipleAsnwer = questions[currentQuestion].multipleAnswer

  const handleAnswerInputClick = (answerOption, index) => {
    setUserSelectedOptionSingle({
      id: answerOption.id,
      index: index,
      isCorrect: answerOption.isCorrect
    })
  }

  const handleMultipleAnswerInputClick = (answerOption, index) => {
    /* check if this answer selected contains in the array userSelectedOption */
    if (
      userSelectedOptionsMultiple.filter((e) => e.id === answerOption.id)
        .length > 0
    ) {
      /* remove answer selected from userSelectedOption using hook */
      return setUserSelectedOptionsMultiple((userSelectedOption) =>
        userSelectedOption.filter((item) => item.id != answerOption.id)
      )
    }
    /* check if this answer selected not contains in the array userSelectedOption */
    if (
      userSelectedOptionsMultiple.filter((item) => item !== answerOption.id)
    ) {
      /* add answer selected in userSelectedOption using hook */
      return setUserSelectedOptionsMultiple([
        ...userSelectedOptionsMultiple,
        {
          id: answerOption.id,
          index: index
        }
      ])
    }
  }

  const labelHighligthSingle = (answerOptions) => {
    let style = ''

    if (
      userSubmittedAnswer.submited === true &&
      userSelectedOptionSingle.id === answerOptions.id &&
      answerOptions.isCorrect
    ) {
      style = 'bg-green-200 border-2 border-green-400 drop-shadow-md '
      return style
    }

    if (
      userSubmittedAnswer.submited === true &&
      userSelectedOptionSingle.id === answerOptions.id
    ) {
      style = 'bg-red-200 border-2 border-red-400 drop-shadow-md '
      return style
    }

    if (userSubmittedAnswer.submited === true && answerOptions.isCorrect) {
      style = 'bg-green-100 border-transparent'
      return style
    }

    if (
      !userSubmittedAnswer.submited === true &&
      userSelectedOptionSingle.id === answerOptions.id
    ) {
      style = 'bg-yellow-50 border-2 border-yellow-400 drop-shadow-md '
      return style
    }

    style = 'bg-white border-transparent'
    return style
  }

  const labelHighligthMultiple = (answerOptions, index) => {
    let style = ''
    let arrayIndexSelected = []

    if (userSelectedOptionsMultiple.length > 0) {
      userSelectedOptionsMultiple.forEach((option) => {
        arrayIndexSelected.push(option.index)
      })
    }

    if (
      userSubmittedAnswer.submited === true &&
      arrayIndexSelected.includes(index) &&
      answerOptions.isCorrect
    ) {
      style = 'bg-green-200 border-2 border-green-400 drop-shadow-md'
      return style
    }

    if (userSubmittedAnswer.submited === true && answerOptions.isCorrect) {
      style = 'bg-green-100 border-transparent'
      return style
    }

    if (
      userSubmittedAnswer.submited === true &&
      arrayIndexSelected.includes(index)
    ) {
      style = 'bg-red-200 border-2 border-red-400 drop-shadow-md'
      return style
    }
    if (arrayIndexSelected.includes(index)) {
      style = 'bg-yellow-50 border-2 border-yellow-400 drop-shadow-md'
      return style
    }

    style = 'bg-white border-transparent'
    return style
  }

  return (
    <ul>
      {isMultipleAsnwer === true
        ? questions[currentQuestion].answerOptions.map(
            (answerOption, index) => (
              <li className="flex" key={index}>
                <label
                  className={
                    'drop-shadow-md rounded-lg mb-4 p-2 w-full border-2 cursor-pointer hover:bg-yellow-50 ' +
                    labelHighligthMultiple(answerOption, index)
                  }
                >
                  <input
                    className="h-4 w-4 border mt-1 align-top mr-4"
                    type="checkbox"
                    disabled={userSubmittedAnswer.submited === true}
                    onChange={() =>
                      userSubmittedAnswer.submited === false &&
                      handleMultipleAnswerInputClick(answerOption, index)
                    }
                  />
                  <b className="mr-2">{showLetterOption(index)}.</b>
                  {answerOption.answerText}
                </label>
              </li>
            )
          )
        : questions[currentQuestion].answerOptions.map(
            (answerOptions, index) => (
              <li className="flex" key={answerOptions.id}>
                <label
                  className={
                    'text-gray-900 drop-shadow-md rounded-lg mb-4 p-2 w-full border-2 cursor-pointer hover:bg-yellow-50 ' +
                    labelHighligthSingle(answerOptions, index)
                  }
                >
                  <input
                    className="h-4 w-4 border mt-1 align-top mr-4"
                    type="radio"
                    name="answer"
                    disabled={userSubmittedAnswer.submited === true}
                    onChange={() =>
                      userSubmittedAnswer.submited === false &&
                      handleAnswerInputClick(answerOptions, index)
                    }
                  />
                  <b className="mr-2">{showLetterOption(index)}.</b>
                  {answerOptions.answerText}
                </label>
              </li>
            )
          )}
    </ul>
  )
}

AnswersOptionsList.propTypes = {
  currentQuestion: PropTypes.number,
  questions: PropTypes.array,
  userSelectedOption: PropTypes.array,
  userSelectedOptionSingle: PropTypes.object,
  setUserSelectedOptionSingle: PropTypes.func,
  userSelectedOptionsMultiple: PropTypes.array,
  setUserSelectedOptionsMultiple: PropTypes.func,
  userSubmittedAnswer: PropTypes.object
}
export default AnswersOptionsList
