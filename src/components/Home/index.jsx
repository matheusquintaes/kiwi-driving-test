import { useState, useEffect, useContext } from 'react'
import client from '../../graphql/client'
import { GET_SUBJECTS } from '../../graphql/queries'
import { AppStateContext } from '../../contexts/appStateContext'

import Card from '../Card'

function Home() {
  const { setGameState } = useContext(AppStateContext)
  const [subjects, setSubjects] = useState(null)

  useEffect(() => {
    const fetchSubjects = async () => {
      const { subjects } = await client.request(GET_SUBJECTS)
      setSubjects(subjects)
      setGameState('home')
    }

    fetchSubjects()
  }, [])

  return (
    <div className="">
      <div className="mb-6">
        <h3 className="text-gray-900 font-medium text-base mb-4">
          Free Road Code Quiz
        </h3>
        {subjects &&
          subjects.map(({ id, title, featured, description }) => (
            <Card
              key={id}
              title={title}
              featured={featured}
              description={description}
            />
          ))}
      </div>
    </div>
  )
}

export default Home
