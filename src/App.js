import "./App.css";
import "./index.css";
import "./Styles/style.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Component/login/login";
import Forgetpassword from "./Component/forget/forgetpassword";
import PageNotFound from "./Component/error/page_not_found";
import UserInfo from "./Component/userInformation/userInfo";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgetpassword" element={<Forgetpassword />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
