import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="lg:grid lg:gap-12 lg:grid-cols-3">
      <div className="mb-6">
        <h3 className="text-gray-900 font-medium text-base mb-4">
          Free Road Code Quiz
        </h3>
        <Link to={`questions/car`}>Car</Link>
        <Link to={`questions/behaviour`}>Behaviour</Link>
      </div>
    </div>
  )
}

export default Home
