function Pagination({ offset, setOffset, page, setPage }) {
  function nextPage() {
    if (offset !== 1100) {
      setOffset(offset + 100);

      setPage(page + 1);
    }
  }

  function prevPage() {
    if (offset !== 0) {
      setOffset(offset - 100);

      setPage(page - 1);
    }
  }

  return (
    <>
      <div className="pagination-btns">
        <button onClick={prevPage}>PREV</button>
        <h3>{String(page).padStart(2, '0')}</h3>
        <button onClick={nextPage}>NEXT</button>
      </div>
    </>
  );
}

export default Pagination;
