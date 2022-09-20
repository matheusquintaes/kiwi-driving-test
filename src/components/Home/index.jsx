import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import client from '../../graphql/client'
import { GET_SUBJECTS } from '../../graphql/queries'

import Card from '../Card'

function Home() {
  const [subjects, setSubjects] = useState(null)

  useEffect(() => {
    const fetchQuestions = async () => {
      const { subjects } = await client.request(GET_SUBJECTS)

      console.log(subjects)
      setSubjects(subjects)
    }

    fetchQuestions()
  }, [])

  return (
    <div className="">
      <div className="mb-6">
        <h3 className="text-gray-900 font-medium text-base mb-4">
          Free Road Code Quiz
        </h3>
        {subjects &&
          subjects.map(({ title, featured, description }) => (
            <Card
              key="title"
              title={title}
              featured={featured}
              description={description}
            />
          ))}

        <Link to={`questions/car`}>Car</Link>
        <Link to={`questions/behaviour`}>Behaviour</Link>
      </div>
    </div>
  )
}

export default Home
