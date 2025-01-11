import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewById } from "../../services/api";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setreviews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const revData = await fetchReviewById(movieId);
        console.log("Полученные данные от API:", revData); // Лог для проверки
        setreviews(revData.results || []); // Убедитесь, что это массив
      } catch (error) {
        console.error("Помилка завантаження");
      }
    };
    getData();
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>Рецензии отсутствуют</p>;
  }

  return (
    <div>
      <h2>Movie Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>
              <strong>Автор: {review.author}</strong>
            </p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
