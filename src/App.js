import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
// import noteContext from './context/notes';
// import { default as NoteContext, default as Notestates } from './context/notes/Notestates';
import Home from './Components/Home';
import { Register } from './Components/Register';
import Notestates from './context/notes/Notestates';



function App() {
  
  return (
    <>
      <Notestates>

        <Navbar />
        {/* <h1>iNotebook - Home</h1> */}
        <Alert />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Register />} />
          </Routes>
        </div>
      </Notestates>
      {/* </NoteContext.Provider> */}
    </>
  );
}

export default App;
