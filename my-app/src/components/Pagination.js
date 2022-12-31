function Pagination({ offset, setOffset, page, setPage }) {
  function nextPage() {
    console.log('next');
    console.log(offset, 'old state');
    if (offset !== 1000) {
      setOffset(offset + 100);
      console.log(offset, 'new state');

      setPage(page + 1);
    }
  }

  function prevPage() {
    console.log('prev');
    console.log(offset, 'old state');
    if (offset !== 0) {
      setOffset(offset - 100);
      console.log(offset, 'new state');

      setPage(page - 1);
    }
  }
  return (
    <>
      <div className="pagination-btns">
        <button onClick={prevPage}>PREV</button>
        <h3>{page}</h3>
        <button onClick={nextPage}>NEXT</button>
      </div>
    </>
  );
}

export default Pagination;
