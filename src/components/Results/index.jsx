import { AppStateContext } from '../../contexts/appStateContext'
import { Link, useParams } from 'react-router-dom'

function Results() {
  const { subject } = useParams()

  function calculatePercentage(score, questionsLength) {
    const result = (score / questionsLength) * 100
    return `${result.toFixed(2)} %`
  }

  return (
    <AppStateContext.Consumer>
      {({ score, questions }) => (
        <>
          <h3 className="text-xl font-bold mb-6 text-gray-900">Results</h3>

          <div className="bg-white shadow-md rounded-lg p-4 w-full  mb-6">
            <b>
              <p>
                You scored <b className="text-lg">{score} </b>out of
                <b className="text-lg"> {questions.length}</b>
              </p>
              {calculatePercentage(score, questions.length)}
            </b>
          </div>

          <h3 className="text-xl font-bold mb-6 text-gray-900">
            {`What's Next?`}
          </h3>

          <div className="bg-white shadow-md rounded-lg mb-8">
            <div className="p-5">
              <h3 className="text-gray-900 font-bold text-lg mb-2">
                {`Restart this test`}{' '}
              </h3>
              <p className="text-gray-900 text-sm mb-2">
                Take this test once again and improve your scores.
              </p>
              <div className="inline-flex items-center ">
                <Link
                  className="text-yellow-500 mr-2 font-bold"
                  to={`/questions/${subject}`}
                >
                  Restart
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg mb-8">
            <div className="p-5">
              <h3 className="text-gray-900 font-bold text-lg mb-2">
                {`Back to home`}{' '}
              </h3>
              <p className="text-gray-900 text-sm mb-2">
                See the all tests available and helpful resources.
              </p>
              <div className="inline-flex items-center ">
                <Link className="text-yellow-500 mr-2 font-bold" to={`/`}>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </AppStateContext.Consumer>
  )
}

export default Results
