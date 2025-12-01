
import { BrowserRouter, Link, Route, Routes } from 'react-router';
import './App.css';
import LoginPage from './components/loginPage/loginPage.tsx';
import NavBar from './components/navBar/navBar.tsx';
import UploadPage from './components/uploadPage/uploadPage.tsx';
import { useSelector } from 'react-redux';
function App() {
  const isLoggedIn = useSelector((state)=> state.user.isLoggedIn);
  console.log("isLoggedIn:", isLoggedIn);
  return (
   <>
      <BrowserRouter>
      {isLoggedIn ? <NavBar/> : null}  
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/upload' element={<UploadPage/>}/>
      </Routes>
      
      </BrowserRouter>
  </>
  );
}

export default App;
