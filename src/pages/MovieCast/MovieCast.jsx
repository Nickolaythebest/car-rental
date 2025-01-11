import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCastById } from "../../services/api";



const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const castData = await fetchCastById(movieId)
        setCast(Array.isArray(castData.cast) ? castData.cast : []);
      }
      catch (error) {
        console.error("Помилка завантаження")
      }
    }
    getData();
  }, [movieId])
  if (cast.length === 0) {
    return <p>Данные о составе актеров отсутствуют.</p>;
  }
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200"; // Базовый URL для изображений
    return <div>
      <h2>Movie cast</h2>
      <ul>
        {cast.map(item => (
          <li key={item.id}>
            {item.profile_path ? 
            <img src={`${IMAGE_BASE_URL}${item.profile_path}`} alt={item.name} /> :
            <p>Фото немає</p>
          }
            <p>
              <strong>{item.name}</strong> — {item.character || "Роль неизвестна"}
            </p>
          </li>
        ))}
        
      </ul>
      </div>;
  };
  export default MovieCast;