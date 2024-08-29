import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Jobs/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from 'react-redux';
import DetailJob from "./pages/Jobs/DetailJob";
import { Navigate } from "react-router-dom";


function App() {
  const token = useSelector(state => state.auth.token);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={token ? <Home /> : <Login />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to='/' />} />
        <Route path="/signup" element={!token ? <Signup /> : <Navigate to='/' />} />
        <Route path="/job/:id" element={!token ? <Navigate to='/login' /> : <DetailJob />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>

  );
}

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black bg-gray-100">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl">Page Not Found</h2>
    </div>
  );
}

export default App;
