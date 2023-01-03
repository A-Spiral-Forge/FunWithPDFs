import { BrowserRouter as Router, Routes,  Route } from "react-router-dom";

import './App.css';

// Importing the components
import Home from './components/Home/Home';
import PDFOpener from "./components/PDFOpener/PDFOpener";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<PDFOpener />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
