import { useContext, useRef, useState } from 'react';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

function Search({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef();
  const [pokemon, setPokemon] = useContext(UserContext);

  const handleFilter = (e) => {
    const searchWord = e.target.value.toLowerCase();
    setInput(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.includes(searchWord);
    });
    if (searchWord === '') {
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
    console.log(e.target.childNodes[0].wholeText);
    localStorage.setItem('clickedPokemon', e.target.childNodes[0].wholeText);
    setPokemon(e.target.childNodes[0].wholeText);
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
            <IoSearchOutline />
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
