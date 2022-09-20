import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="bg-yellow-50 flex items-center">
      <Link to={`/`}>
        <img className="mr-4" src={'./src/assets/logo.png'} alt="logo" />
      </Link>
      <p className="text-xs font-bold">Kiwi Driving Test</p>
    </div>
  )
}

export default Header
