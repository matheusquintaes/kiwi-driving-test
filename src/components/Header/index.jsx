import { Link } from 'react-router-dom'
import LogoSvg from '../LogoSvg'
function Header() {
  return (
    <div className="bg-slate-50 shadow-md shadow-slate-900/5 flex justify-center">
      <div className="max-w-2xl w-full flex items-center px-4 py-4">
        <Link to={`/`}>
          <LogoSvg />
        </Link>
      </div>
    </div>
  )
}

export default Header
