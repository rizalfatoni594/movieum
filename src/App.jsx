import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import MovieContextProvider from './contexts/MovieContext.jsx';
import './css/App.css';
import Home from './pages/Home.jsx';
import Favorites from './pages/Favorites.jsx';

export default function App() {
  return (
    <MovieContextProvider>
      <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </main>
    </MovieContextProvider>
  );
}
