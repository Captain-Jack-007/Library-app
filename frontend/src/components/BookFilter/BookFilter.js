import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTitleFilter,
  resetFilter,
  filterTitle,
  filterAuthor,
  setAuthorFilter,
  setFavoriteFilter,
  filterOnlyFavorite,
} from '../../redux/slices/filterSlice';
import './BookFilter.css';

const BookFilter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(filterTitle);
  const authorFilter = useSelector(filterAuthor);
  const favoriteFilter = useSelector(filterOnlyFavorite);

  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };
  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };
  const handleFavoriteFilterChange = () => {
    dispatch(setFavoriteFilter());
  };

  const handleResetFilters = () => {
    dispatch(resetFilter());
  };

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            value={titleFilter}
            type="text"
            placeholder="Filter by title..."
            onChange={handleTitleFilterChange}
          />
        </div>
        <div className="filter-group">
          <input
            value={authorFilter}
            type="text"
            placeholder="Filter by author..."
            onChange={handleAuthorFilterChange}
          />
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={favoriteFilter}
              onChange={handleFavoriteFilterChange}
            />
            Only Favorite
          </label>
        </div>
        <button type="button" onClick={handleResetFilters}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default BookFilter;
