import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import Home from './pages/Home.jsx';
import Favorites from './pages/Favorites.jsx';
import NavBar from './components/NavBar.jsx';
import MovieProvider from './contexts/MovieContext.jsx';

export default function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}
