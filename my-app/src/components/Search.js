import { useContext, useRef, useState } from 'react';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

function Search({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef();
  const [isAuth, login, logout, count, setCount] = useContext(UserContext);

  const handleFilter = (e) => {
    const searchWord = e.target.value.toLowerCase();
    const searchWordStrict = searchWord.replace(/[^A-Za-z]/gi, '');
    setInput(searchWordStrict.toUpperCase());
    const newFilter = data.filter((value) => {
      return value.name.includes(searchWordStrict);
    });
    if (searchWordStrict === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setInput('');
    inputRef.current.focus();
  };

  function onClick(e) {
    setCount(count + 1);
    localStorage.setItem('clickedPokemon', e.target.childNodes[0].wholeText);
    localStorage.setItem(count, e.target.childNodes[0].wholeText);
  }

  return (
    <div className="search">
      <div className="search--input">
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleFilter}
          value={input}
          ref={inputRef}
        />
        <div className="search--icon">
          {input.length > 0 ? (
            <IoCloseOutline onClick={clearInput} />
          ) : (
            <IoSearchOutline onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="data-result">
          {filteredData.slice(0, 8).map((pokemon, key) => {
            return (
              <Link
                onClick={onClick}
                className="data-item"
                to="/pokemon"
                key={key}
              >
                <p>{pokemon.name}</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Search;
