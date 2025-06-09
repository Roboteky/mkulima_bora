import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"


const MainLayout = ({children}) => {
  return (
    <>
    <Navbar/>
    <main>{children}</main>
    <Footer/>
    </>
  )
}

export default MainLayout