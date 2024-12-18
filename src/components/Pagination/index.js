
import './index.css'
  
const Pagination = ({currentPage, totalPages, onPageChange}) => (
  <div className="pages-container">
    <div className="pages-btns">
      <button
        type="button"
        className="prev-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="current-page">{currentPage}</span>
      <button
        type="button"
        className="nxt-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  </div>
)

export default Pagination

