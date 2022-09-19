import { useParams } from 'react-router-dom'

function Questions() {
  const { subject } = useParams()
  return (
    <div className="max-w-lg">
      <div className="bg-white shadow-md rounded-lg mb-8 p-4 flex justify-center flex-col">
        <p className="text-gray-900 font-semibold text-base mb-4">{subject}</p>

        <p className="text-base">{subject} questions</p>
      </div>
    </div>
  )
}

export default Questions
