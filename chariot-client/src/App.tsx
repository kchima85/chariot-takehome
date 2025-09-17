import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import VerificationComponent from './components/VerificationComponent'

function App() {
  return (
    <Router>
      <div className="bg-background min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/verify" element={<VerificationComponent />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
