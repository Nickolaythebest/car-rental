import { useState, useEffect, useCallback } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import MovieList from '../../components/MovieList/MovieList.jsx'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import { fetchMovie } from '../../services/api.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';

function MoviesPage() {
    const [err, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    
    const [searchParams, setSearchParams] = useSearchParams();

    const topic = searchParams.get('query') ?? '';
    const page = Number(searchParams.get('page') ?? 1)

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                setError(false);
                setLoading(true);
                const {results, total_pages} = await fetchMovie(topic, page)
                setMovies(prev => (page === 1 ? results : [...prev, ...results]));
                setTotalPage(total_pages)
            }
            catch (err){
                setError(true);
                toast.error('Произошла ошибка при загрузке данных!');
            }
            finally {
                setLoading(false)
            };}
            if(topic) fetchMovieData();
        }, [page, topic])

        const handleChange = () => {
            setSearchParams({query: topic, page: page + 1})
        }
        const handleSearch = useCallback((newTopic) => {
            if (!newTopic.trim()) {
                return setSearchParams({});
            }
            setSearchParams({ query: newTopic, page: 1 });
            
            setMovies([]);
        }, [setSearchParams]);

    
    return(
        <div>
        <h1>Your films</h1>
        <SearchBar onSearch={handleSearch} />
        {loading && <Loader />}
        {movies.length > 0 && <MovieList movies={movies} />}
        {movies.length > 0 && page < totalPage && <LoadMoreBtn newPage={handleChange} />}
        {err && <ErrorMessage />}
        <ToastContainer />
        </div>
    )
}
export default MoviesPage;