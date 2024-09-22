import Final from "./components/final";
import Res from "./components/Res";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
      
      <Router>
      <Routes>
        
        <Route path="/final" element={<Final />} />
        <Route path="/res" element={<Res />}/>
      </Routes>
    </Router>
  )
}

export default App