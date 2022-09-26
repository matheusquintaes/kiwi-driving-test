import { Outlet } from 'react-router-dom'
import Header from '../Header'

function Layout() {
  return (
    <div className="w-full">
      <Header />
      <div className="flex justify-center">
        <div className="max-w-2xl w-full p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
