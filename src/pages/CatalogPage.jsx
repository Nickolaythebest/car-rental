import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import LoadMoreBtn from '../components/LoadMoreBtn/LoadMoreBtn.jsx';
import Loader from '../components/Loader/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage.jsx';
import FilterBar from '../components/FilterBar/FilterBar.jsx';
import CarList from '../components/CarList/CarList.jsx';

import {
  selectCars,
  selectLoading,
  selectError,
  selectPage,
  selectTotalPages,
 
} from '../redux/cars/selectors.js';

import {
  fetchCarsThunk,
  fetchMoreCarsThunk,
  
} from '../redux/cars/operations.js';
// ДОБАВЬ ЭТО:
import { resetCars } from '../redux/cars/carsSlice.js';


function CatalogPage() {
  const dispatch = useDispatch();

  const carsLoaded = useSelector(selectCars);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
console.log(`page:${page}`);
console.log(`Totalpage:${totalPages}`);

  // 🔍 При инициализации загружаем данные
  useEffect(() => {
    if (carsLoaded.length === 0 && !loading && !error) {
      dispatch(fetchCarsThunk());
    }
  }, [dispatch, carsLoaded, loading, error]);
  
  console.log("🚗 CarList получил:", carsLoaded);
  console.log(Array.isArray(carsLoaded), carsLoaded);

  // 🔁 Обработчик кнопки Load More
  const handleChange = () => {
    dispatch(fetchMoreCarsThunk(page + 1));
  };

  // 🔍 Обработка фильтров
  const handleSearch = (filters) => {
    dispatch(resetCars()); // очистить предыдущие
    dispatch(fetchCarsThunk(filters)); // применить новые
  };

  // 🧪 Для наглядности ошибок
  useEffect(() => {
    if (error) {
      toast.error('Щось пішло не так... 😥');
    }
  }, [error]);

  return (
    <div>
      <FilterBar onSearch={handleSearch} />

      {loading && <Loader />}

      {<CarList cars={carsLoaded.cars} />}

      { page < totalPages && (
        <LoadMoreBtn newPage={handleChange} />
      )}

      {error && <ErrorMessage />}

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default CatalogPage;
