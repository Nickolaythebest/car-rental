import { useEffect, useState, useRef } from "react";
import { useLocation, useParams, Link, Outlet } from "react-router-dom";
import { fetchMovieById } from "../../services/api.js";
import Loader from "../../components/Loader/Loader.jsx"
import s from "./MovieDetailsPage.module.css"



const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const goBackRef = useRef(location.state?.location ?? "/movies");


  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const movieData = await fetchMovieById(movieId); // Получаем данные о фильме
        setMovie(movieData); // Сохраняем в состояние
        setLoading(false)
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false); // Устанавливаем, что загрузка завершена
      }
    };

    getData();
  }, [movieId]);

  // Если идет загрузка данных
  

  // Если данных нет (например, ошибка)
  if (!movie) {
    return <p>Movie not found</p>;
  }

  // URL для изображения
  const imageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
    : "https://placekitten.com/500/500";
    const title = movie.title && movie.title !== "1" ? movie.title : "Title not found";
  return (
    <>
    <Link to={goBackRef.current}>Go back</Link>
      {loading && <Loader />}
      <div className={s.container}>
      <img src={imageUrl} alt={movie.title} />
      <div className={s.subscribe}>
      <h3>{title}</h3>
      <p>
        <strong>User Score:</strong> {movie.vote_average * 10}%
      </p>
      <p>
        <strong>Overview:</strong> {movie.overview}
      </p>
      <p>
        <strong>Genres:</strong>{" "}
        {movie.genres ? movie.genres.map(genre => genre.name).join(", ") : "N/A"}
      </p>
      </div>
      </div>
      <nav>
        <ul>
          <li><Link to='cast'>Cast</Link></li>
          <li><Link to='reviews'>Reviews</Link></li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default MovieDetailPage;
