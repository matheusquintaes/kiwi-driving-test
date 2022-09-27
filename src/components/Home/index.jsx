import { useState, useEffect, useContext } from 'react'
import client from '../../graphql/client'
import { GET_SUBJECTS } from '../../graphql/queries'
import { AppStateContext } from '../../contexts/appStateContext'
import { Link } from 'react-router-dom'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'

import Card from '../Card'

function Home() {
  const { setGameState, setScore } = useContext(AppStateContext)
  const [subjects, setSubjects] = useState(null)

  useEffect(() => {
    const fetchSubjects = async () => {
      const { subjects } = await client.request(GET_SUBJECTS)
      setSubjects(subjects)
      setGameState('home')
      setScore(0)
    }

    fetchSubjects()
  }, [])

  return (
    <div className="">
      <div className="flex flex-col items-center w-full pt-6 pb-12">
        <div className="max-w-md text-center">
          <h1 className="text-gray-900 font-bold text-2xl  mb-4">
            Prepare for your driving test with our Free Road Code Quiz
          </h1>
          <p className="text-base text-gray-700 mb-6">
            The driving theory questions will help you learn the Road Code
            quickly and effectively in fun, easy-to-use mock theory tests,
            conveniently organised into topics.
          </p>
          <Link
            className="btn-primary"
            to={`questions/Car`}
          >{`Start Car Test`}</Link>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-6">Road Coad Practive Tests</h2>
      <div className="lg:grid lg:gap-8 lg:grid-cols-2">
        {subjects &&
          subjects.map(({ id, title, description, image }) => (
            <Card
              key={id}
              title={title}
              description={description}
              image={image}
            />
          ))}
      </div>
      <h2 className="text-xl font-bold mb-6">Helpful resources</h2>
      <div className="bg-white shadow-md rounded-lg mb-8">
        <div className="p-5">
          <h3 className="text-gray-900 font-bold text-base mb-2">
            The official New Zealand road code
          </h3>
          <p className="text-sm text-gray-700 mb-4 ">
            The official NZ road code is a user-friendly guide to New Zealand's
            traffic law and safe driving practices.
          </p>
          <div className="inline-flex items-center ">
            <a
              className="text-yellow-500 mr-2 font-bold text-sm"
              href="https://www.nzta.govt.nz/roadcode"
              target="_blank"
              rel="noreferrer"
            >
              See More
            </a>
            <ArrowTopRightOnSquareIcon className="text-yellow-500 w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
