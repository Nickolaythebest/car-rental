import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarsByIdThunk } from '../redux/cars/operations';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

function CarPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const car = useSelector(state => state.cars.selectedCar);
  const loading = useSelector(state => state.cars.isLoading);
  const error = useSelector(state => state.cars.error);

  useEffect(() => {
    dispatch(fetchCarsByIdThunk(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  if (!car) return null;

  return (
    <div>
      <h2>{car.make} {car.model}</h2>
      <img src={car.img} alt={`${car.make} ${car.model}`} />
      <p>{car.description}</p>
      {/* можно добавить больше данных: цена, адрес, пробег и т.п. */}
    </div>
  );
}

export default CarPage;
