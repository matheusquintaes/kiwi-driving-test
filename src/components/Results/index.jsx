import { AppStateContext } from '../../contexts/appStateContext'
import { useContext } from 'react'

function Results() {
  const { setGameState, setQuestions, setScore, setSubject } =
    useContext(AppStateContext)

  // const handleSubmitButtonClick = (subject) => {
  //   setGameState('playing')
  //   setSubject(subject)
  //   // setQuestions(shuffleArray(allQuestions[subject]))
  //   setQuestions(allQuestions[subject])
  //   setScore(0)
  // }
  return (
    <AppStateContext.Consumer>
      {({ score, questions }) => (
        <>
          <div className="bg-white shadow-md rounded-lg p-4 w-full">
            <b>
              <p>
                You scored {score} out of {questions.length}
              </p>
            </b>
          </div>

          <h3 className="text-gray-900 font-medium text-base my-4">
            Improve your scores
          </h3>
        </>
      )}
    </AppStateContext.Consumer>
  )
}

export default Results
