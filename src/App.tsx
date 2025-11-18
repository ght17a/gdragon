import { Routes, Route } from "react-router-dom"
import Navbar from './shared/components/Navbar/Navbar'
import Discography from "./Pages/DiscographyPage"
import './App.css'
import Home from "./Pages/HomePage"
import Fashion from "./Pages/FashionPage"
import PmoArchive from "./Pages/PmoArchivePage"
import News from "./Pages/NewsPage"
import SongsList from "./Components/SongsList"

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
          <Route path="/discography/:albumId" element={<SongsList />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>
    </>
  )
}

export default App
