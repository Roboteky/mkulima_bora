import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from "./Layout/MainLayout"
import Home from "./Pages/Home"
import About from "./Pages/About"
import UserDashboard from "./Pages/UserDashboard"

const App = () => {
  return (

    <Router>
      <Routes>
        <Route element={<MainLayout/>}>
        <Route path="/" element={<Home/>}/>
        ,<Route path="/about" element={<About/>}/>
        </Route>
      </Routes>
      <Routes>
        <Route path="/user" element={<UserDashboard/>}/>
        
      </Routes>
    </Router>

  )
}

export default App