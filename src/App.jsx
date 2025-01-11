
import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
/*import MoviesPage from './pages/MoviesPage/MoviesPage.jsx';*/
/*import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage.jsx';*/
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
/*import MovieCast from './pages/MovieCast/MovieCast.jsx';*/
/*import MovieReviews from './pages/MovieReviews/MovieReviews.jsx';*/
import { lazy } from "react";
import './App.css'

/*const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));*/
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage.jsx'))
const MovieDetailPage = lazy(() => import('./pages/MovieDetailPage/MovieDetailPage.jsx'))
const MovieCast = lazy(() => import('./pages/MovieCast/MovieCast.jsx'))
const MovieReviews = lazy(() => import('./pages/MovieReviews/MovieReviews.jsx'))
function App() {
  
  return (
    <>
    <Header />
      <div>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movies' element={<MoviesPage />} />
          <Route path='/movies/:movieId' element={<MovieDetailPage />}>
            <Route path='/movies/:movieId/cast' element={<MovieCast />} />
            <Route path='/movies/:movieId/reviews' element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
