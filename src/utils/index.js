export function showLetterOption(questionNumber) {
  if (questionNumber === 0) {
    return 'A'
  }
  if (questionNumber === 1) {
    return 'B'
  }
  if (questionNumber === 2) {
    return 'C'
  }
  if (questionNumber === 3) {
    return 'D'
  }
}

export function shuffleArray(array) {
  let i = array.length - 1
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export function getCorrectAnswersOfMultipleQuestion(
  currentQuestionAnswerOptions
) {
  const correctAnswers = currentQuestionAnswerOptions.filter(
    checkCorrectAnswersOfMultipleQuestion
  )

  function checkCorrectAnswersOfMultipleQuestion(answers) {
    return answers.isCorrect === true
  }

  let correctAnswersIdList = []
  correctAnswers.forEach(function (option) {
    correctAnswersIdList.push(option.id)
  })

  return correctAnswersIdList
}

export function checkUserAnswersWithCorrectAnswers(
  correctAnswers,
  userSelectedOption
) {
  if (correctAnswers.length === userSelectedOption.length) {
    let incorrect = false

    userSelectedOption.forEach(function (option) {
      if (!correctAnswers.includes(option.id)) {
        incorrect = true
      }
    })

    if (incorrect === false) {
      return true
    }
  } else {
    return false
  }
}
