import { Routes, Route } from "react-router-dom"
import Navbar from './shared/components/Navbar/Navbar'
import Discography from "./Discography/Discography"
import './App.css'
import Home from "./Home/Home"
import Fashion from "./Fashion/Fashion"
import PmoArchive from "./PmoArchive/PmoArchive"
import News from "./News/News"

function App() {

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discography" element={<Discography />} />
          <Route path="/fashion" element={<Fashion />} />
          <Route path="/pmoArchive" element={<PmoArchive />} />
          <Route path="/news" element={<News />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>
    </>
  )
}

export default App
