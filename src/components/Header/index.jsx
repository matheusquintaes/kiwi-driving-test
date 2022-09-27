import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="bg-slate-50 shadow-md shadow-slate-900/5 flex justify-center">
      <div className="max-w-2xl w-full flex items-center px-4 py-2">
        <Link to={`/`}>
          <img className="mr-4" src={'../src/assets/logo.png'} alt="logo" />
        </Link>
        <p className="text-xs font-bold">Kiwi Driving Test</p>
      </div>
    </div>
  )
}

export default Header
