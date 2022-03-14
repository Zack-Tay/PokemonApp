import "./App.css";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import PrivateRoute from "./Utils/PrivateRoute";
import { AuthProvider } from "./Context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Capture from "./Pages/Capture";
import ViewMyPokemon from "./Pages/viewMyPokemon";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              element={<PrivateRoute component={<HomePage />} />}
              path="/"
              exact
            />
            <Route
              element={<PrivateRoute component={<ViewMyPokemon />} />}
              path="/myPokemon/"
              
            />
            <Route
              element={<PrivateRoute component={<Capture />} />}
              path="/Capture/"
              
            />
            <Route element={<LoginPage />} path="/login/" />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
