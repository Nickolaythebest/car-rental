import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import css from './CarCard.module.css';
import { toggleFavoriteThunk } from '../../redux/cars/operations';
import IconSvg from '../IconSvg/IconSvg.jsx';

function CarCard({ car }) {
  const dispatch = useDispatch();
  const {
    id,
    make,
    model,
    year,
    rentalPrice,
    address,
    mileage,
    img,
    isFavorite,
  } = car;

  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavorite = () => {
    dispatch(toggleFavoriteThunk({ id, isFavorite: !favorite }));
    setFavorite(!favorite);
  };

  return (
    <div className={css.card}>
      <img src={img} alt={`${make} ${model}`} className={css.image} />
      <button
            type="button"
            className={`${css.favBtn} ${favorite ? css.active : ''}`}
            onClick={handleFavorite}
          >
            {favorite 
            ? <IconSvg className={css.icon} width={16} height={16} name="icon-heart-active" /> 
            : <IconSvg className={css.icon} width={16} height={16} name="icon-heart" />
            } 
          </button>
      <div className={css.info}>
        <div className={css.header}>
          <h3 className={css.title}>
            {make} <span className={css.model}>{model}</span>, {year}
          </h3>
          <p className={css.price}>{rentalPrice}</p>
        </div>
        <p className={css.details}>
          {address.split(',').slice(1, 3).join(' • ')} • {Math.floor(mileage).toLocaleString('en-US')} km
        </p>
        <div className={css.actions}>
        <Link to={`/catalog/${id}`} className={css.moreBtn}>
            Read more
          </Link>

        </div>
      </div>
    </div>
  );
}

CarCard.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.string.isRequired,
    make: PropTypes.string,
    model: PropTypes.string,
    year: PropTypes.number,
    rentalPrice: PropTypes.string,
    address: PropTypes.string,
    mileage: PropTypes.number,
    img: PropTypes.string,
    isFavorite: PropTypes.bool,
  }).isRequired,
};

export default CarCard;
