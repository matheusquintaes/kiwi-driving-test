import React from 'react'
// import { useState } from 'react'
import { showLetterOption } from '../../utils/index'
import PropTypes from 'prop-types'

function AnswersOptionsList({
  questions,
  currentQuestion,
  userSelectedOption,
  setUserSelectedOption,
  userSubmittedAnswer
}) {
  const isMultipleAsnwer = questions[currentQuestion].multipleAnswer

  const handleAnswerInputClick = (answerOption, index) => {
    setUserSelectedOption([
      {
        id: answerOption.id,
        index: index,
        isCorrect: answerOption.isCorrect
      }
    ])
  }

  const handleMultipleAnswerInputClick = (answerOption, index) => {
    /* check if this answer selected contains in the array userSelectedOption */
    if (userSelectedOption.filter((e) => e.id === answerOption.id).length > 0) {
      /* remove answer selected from userSelectedOption using hook */
      return setUserSelectedOption((userSelectedOption) =>
        userSelectedOption.filter((item) => item.id != answerOption.id)
      )
    }
    /* check if this answer selected not contains in the array userSelectedOption */
    if (userSelectedOption.filter((item) => item !== answerOption.id)) {
      /* add answer selected in userSelectedOption using hook */

      return setUserSelectedOption([
        ...userSelectedOption,
        {
          id: answerOption.id,
          index: index
        }
      ])
    }
  }

  return (
    <ul>
      {isMultipleAsnwer === true
        ? questions[currentQuestion].answerOptions.map(
            (answerOption, index) => (
              <li className="flex" key={index}>
                <label className="shadow-md rounded-lg mb-4 p-2 w-full border-2 ">
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
                <label className="shadow-md rounded-lg mb-4 p-2 w-full border-2">
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
  setUserSelectedOption: PropTypes.func,
  userSubmittedAnswer: PropTypes.object
}
export default AnswersOptionsList
