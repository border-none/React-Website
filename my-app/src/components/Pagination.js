function Pagination({ offset, setOffset, page, setPage }) {
  console.log('💥 This is offset', offset);
  function nextPage() {
    console.log('FUNCTION START___________________________');
    console.log('offset when NEXT is clicked', offset);
    if (offset !== 1100) {
      console.log('setting offset', ' ', offset, ' ', '+100');
      setOffset(offset + 100);
      console.log('offset is now +100', offset);

      setPage(page + 1);
    }
    console.log('FUNCTION END ___________________________');
  }

  function prevPage() {
    if (offset !== 0) {
      setOffset(offset - 100);

      setPage(page - 1);
    }
  }

  console.log('CURRENT PAGE IS', page);

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
