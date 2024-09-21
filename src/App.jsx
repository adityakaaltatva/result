import Final from "./components/final"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
      
      <Router>
      <Routes>
        
        <Route path="/final" element={<Final />} />
      </Routes>
    </Router>
  )
}

export default App