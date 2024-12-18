import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import TopRated from "./components/TopRated"
import Upcoming from "./components/Upcoming"
import SingleMoviePage from "./components/SingleMoviePage"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/movie/:id" element={<SingleMoviePage />} />
      </Routes>
    </Router>
  )
}

export default App
