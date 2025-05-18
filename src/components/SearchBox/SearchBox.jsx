import { useDispatch } from 'react-redux';
import s from './SearchBox.module.css'
import { changeFilter } from '../../redux/filters/slice.js';

const SearchBox = () => {
    const dispatch = useDispatch();
    return (
        <div className={s.dataContainer}>
            <label htmlFor="" className={s.text}>Find contacts by name</label>
            <input type="text" name='text' placeholder='Search...' className={s.typing} onChange={(e) => dispatch(changeFilter(e.target.value))} />
        </div>
    )
}
export default SearchBox;