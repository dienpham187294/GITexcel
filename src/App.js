import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DocumentsForMap from "./getDocument_ForOnlyMapConversation";
import Test from "./Get_Test";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<DocumentsForMap />} />{" "}
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
