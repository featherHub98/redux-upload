
import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import LoginPage from './components/loginPage/loginPage.tsx';
import NavBar from './components/navBar/navBar.tsx';
import UploadPage from './components/uploadPage/uploadPage.tsx';
import { useSelector } from 'react-redux';
import HomePage from './components/homePage/HomePage.tsx';
function App() {
  const isLoggedIn = useSelector((state)=> state.user.isLoggedIn);
  console.log("isLoggedIn:", isLoggedIn);
  return (
   <>
      <BrowserRouter>
      {isLoggedIn ? <NavBar/> : null}  
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
         <Route path='/upload' element={isLoggedIn ? <UploadPage/> :<LoginPage/> }/> 
         <Route path='/home' element={<HomePage/>}/>
      </Routes>
      
      </BrowserRouter>
  </>
  );
}

export default App;
