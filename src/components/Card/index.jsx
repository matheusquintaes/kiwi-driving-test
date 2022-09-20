import PropTypes from 'prop-types'

function Card({ title, featured, description }) {
  return (
    <>
      {featured ? (
        <div className="bg-white shadow-md rounded-lg mb-8">
          <img
            className="rounded-t-lg md:h-1/4"
            src="https://flowbite.com/docs/images/blog/image-1.jpg"
            alt=""
          />
          <div className="p-5">
            <h3 className="text-gray-900 font-bold text-xl mb-2">{title}</h3>
            <p className="font-normal text-gray-800 mb-4">{description}</p>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg mb-8 flex items-center">
          <img
            className="rounded-l-lg w-28 h-full bg-center bg-no-repeat bg-cover"
            src="https://flowbite.com/docs/images/blog/image-1.jpg"
            alt=""
          />
          <div className="flex justify-between w-full p-3">
            <div>
              <h3 className="text-gray-900 font-bold text-xl">{title}</h3>
              <p className="text-xs font-light text-gray-600">{description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  featured: PropTypes.bool,
  description: PropTypes.string
}

export default Card
