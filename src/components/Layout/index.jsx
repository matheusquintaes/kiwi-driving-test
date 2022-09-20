import { Outlet } from 'react-router-dom'
import Header from '../Header'

function Layout() {
  return (
    <div className="w-full flex justify-center relative p-4">
      <div className="max-w-4xl">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
