import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from "./Layout/MainLayout"
import Home from "./Pages/Home"
import About from "./Pages/About"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout/>}>
        <Route path="/" element={<Home/>}/>
        ,<Route path="/about" element={<About/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App