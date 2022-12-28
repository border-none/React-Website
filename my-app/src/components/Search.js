import { useRef, useState } from 'react';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';

function Search({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef();

  const handleFilter = (e) => {
    const searchWord = e.target.value.toLowerCase();
    setInput(searchWord);
    console.log(searchWord, 'searchWord');
    console.log(filteredData, 'data');
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
              <a className="data-item" href="pokemon" key={key}>
                <p> {pokemon.name}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Search;
