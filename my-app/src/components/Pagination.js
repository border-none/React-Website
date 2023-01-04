import { useState } from 'react';

function Pagination({ page, setPage }) {
  const [show, setShow] = useState(null);

  function nextPage() {
    up();
    setPage((prevPage) => prevPage + 1);
    console.log(page, 'PAGE');
  }

  function prevPage() {
    if (page >= 2) {
      up();
      setPage((prevPage) => prevPage - 1);
      console.log(page, 'PAGE');
    }
  }

  function pageSelect(number) {
    up();
    setPage(number);
    setTimeout(() => {
      console.log(page);
    }, 1000);
    show ? setShow(false) : setShow(true);
  }

  function toggle() {
    show ? setShow(false) : setShow(true);
  }

  function up() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <>
      <div className="pagination-btns">
        {show && (
          <div className="page-select">
            <button onClick={() => pageSelect(1)}>1</button>
            <button onClick={() => pageSelect(2)}>2</button>
            <button onClick={() => pageSelect(3)}>3</button>
            <button onClick={() => pageSelect(4)}>4</button>
            <button onClick={() => pageSelect(5)}>5</button>
            <button onClick={() => pageSelect(6)}>6</button>
            <button onClick={() => pageSelect(7)}>7</button>
            <button onClick={() => pageSelect(8)}>8</button>
          </div>
        )}
        <button onClick={prevPage}>PREV</button>
        <h3 onClick={toggle}>{String(page).padStart(2, '0')}</h3>
        <button onClick={nextPage}>NEXT</button>
      </div>
    </>
  );
}

export default Pagination;
