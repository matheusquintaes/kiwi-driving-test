import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Card({ title, description, image }) {
  return (
    <>
      <div className="">
        <div className="bg-white shadow-md rounded-lg mb-8">
          <img
            className="h-32 w-full object-cover rounded-t-lg"
            src={image.url}
          />
          <div className="p-5">
            <h3 className="text-gray-900 font-bold text-lg mb-2">{title}</h3>
            <p className="text-base text-gray-700 mb-4 lg:h-24 min-h-full">
              {description}
            </p>
            <Link className="btn-primary" to={`questions/${title}`}>
              Start Now
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.object
}

export default Card
