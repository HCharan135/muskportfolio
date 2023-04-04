import Discussions from "./components/Discussions";
import AddDiscussion from "./components/AddDiscussion";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Discussion from "./components/Discussion";
function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/Discussion/:id" element={<Discussion/>} />
          <Route
            path="/"
            element={
              <div className="row mt-5">
                <div className="col-md-8">
                  <Discussions />
                </div>
                <div className="col-md-4">
                  <AddDiscussion />
                </div>
              </div>
            }
          />
        </Routes>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;
