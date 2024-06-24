import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='Layout'>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout