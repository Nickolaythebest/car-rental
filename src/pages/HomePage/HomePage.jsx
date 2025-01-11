import { useState, useEffect } from 'react';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import MovieList from '../../components/MovieList/MovieList.jsx'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import { fetchMovie } from '../../services/api.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function MoviesPage() {
    const [err, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                setError(false);
                setLoading(true);
                const {results, total_pages} = await fetchMovie(page)
                setMovies(prev => [...prev, ...results]);
                setTotalPage(total_pages)
            }
            catch (err){
                setError(true);
                toast.error('Произошла ошибка при загрузке данных!');
            }
            finally {
                setLoading(false)
            };}
            fetchMovieData();
        }, [page])

        const handleChange = () => {
            setPage(prev => prev + 1)
        }
    

    
    return(
        <div>
        <h1>Trending today</h1>
        {loading && <Loader />}
        {movies.length > 0 && <MovieList movies={movies} />}
        {movies.length > 0 && page < totalPage && <LoadMoreBtn newPage={handleChange} />}
        {err && <ErrorMessage />}
        <ToastContainer />
        </div>
    )
}
export default MoviesPage;