import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const fetchMovie = async (topic, page) => {
  try {
    // Если topic есть, используем поиск, если нет - получаем популярные фильмы
    const endPoint = topic ? '/search/movie' : '/trending/movie/day';

    // Параметры запроса
    const params = {
      page,
      api_key: '8aba4e3419a44727b7eb66f35fce4fa2',
    };

    // Добавляем параметр query, если есть topic
    if (topic) {
      params.query = topic;
    }

    const response = await axios.get(endPoint, { params });

    return {
      results: response.data.results,
      total_pages: response.data.total_pages,
    };
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    throw error;
  }
};
export const fetchMovieById = async (id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          api_key: "8aba4e3419a44727b7eb66f35fce4fa2",
        },
      }
    );
    return response.data; // Вернем детали фильма
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
};
export const fetchCastById = async (id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits`,
      {
        params: {
          api_key: "8aba4e3419a44727b7eb66f35fce4fa2",
        },
      }
    );
    return response.data; // Вернем детали фильма
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
};
export const fetchReviewById = async (id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/reviews`,
      {
        params: {
          api_key: "8aba4e3419a44727b7eb66f35fce4fa2",
        },
      }
    );
    return response.data; // Вернем детали фильма
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
};