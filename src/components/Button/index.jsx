import PropTypes from 'prop-types'

const Button = ({ onClick, children }) => {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  )
}
Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.func
}

export default Button
