import { useState } from "react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

function App() {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false)

  return (
    <div className="theme theme_color_dark theme_size_default">
      <Header isMenuOpen={isMenuOpen} switchMenuOpen={() => setMenuOpen(!isMenuOpen)} />
      <Sidebar expanded={isMenuOpen} />
    </div>
  )
}

export default App
