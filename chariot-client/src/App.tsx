import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HomePage from './pages/HomePage'
import VerificationComponent from './components/VerificationComponent'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="bg-background min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/verify" element={<VerificationComponent />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
