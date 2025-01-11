import s from './LoadMoreBtn.module.css'

function LoadMoreBtn({newPage}) {
    return (
        <button type='button' className={s.loadBtn} onClick={newPage}>Load more</button>
    )
}

export default LoadMoreBtn;