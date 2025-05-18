import PropTypes from 'prop-types';
import CarCard from '../CarCard/CarCard.jsx';
import css from './CarList.module.css';

function CarList({ cars }) {
  console.log("🚗 CarList получил:", cars);
  return (
    <ul className={css.list}>
      {cars.map((car) => (
        <li key={car.id} className={css.item}>
          <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
}

CarList.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CarList;
