import s from './MovieList.module.css'
import {  Link, useLocation } from 'react-router-dom';

function MovieList ({movies}){
    const location = useLocation()
    console.log(movies)
    const imageUrl = "https://image.tmdb.org/t/p/w500/";
    return (
        <>
        <ul className={s.list}>
            {movies.map(item => (
        
            <li key={item.id + "_" + item.title + "_" + Math.random()}>
                <Link to={`/movies/${item.id}`} state={{location}}>
                <div>
                                <h3>{item.title}</h3>
                                {item.backdrop_path ? (
                                    <img
                                        src={imageUrl + item.backdrop_path}
                                        alt={item.title}
                                    />
                                ) : (
                                    <div className={s.placeholder}>
                                        <p>No Image Available</p>
                                    </div>
                                )}
                            </div>
            </Link>
            </li>
            ))}
        </ul>
        </>
    )
}
export default MovieList;