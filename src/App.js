import './App.css';
import Signin from './pages/Signin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <Signin /> } />
        <Route path="/signup" element={ <Signup /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
