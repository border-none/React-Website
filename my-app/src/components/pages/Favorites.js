import Md10K from 'react-icons/md';
import { IoHeartOutline, IoHomeOutline } from 'react-icons/io5';

export default function Favorites() {
  return (
    <>
      <div className="fav">
        <h1>
          {IoHeartOutline()} Favorite pokemons of{' '}
          {window.localStorage.getItem('user')
            ? window.localStorage.getItem('user')
            : ''}
        </h1>
      </div>
    </>
  );
}
