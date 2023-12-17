import React from 'react';
import './BookList.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  deleteBook,
  toggleFavorite,
  selectBooks,
} from '../../redux/slices/bookSlice';
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import {
  filterTitle,
  filterOnlyFavorite,
  filterAuthor,
} from '../../redux/slices/filterSlice';

function BookList() {
  const books = useSelector(selectBooks);
  const titleFilter = useSelector(filterTitle);
  const authorFilter = useSelector(filterAuthor);
  const favoriteFilter = useSelector(filterOnlyFavorite);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };
  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  const filteredBooks = books.filter((book) => {
    /*  if (titleFilter !== '') {
      const matchedTitle = book.title
        .toLowerCase()
        .includes(titleFilter.toLowerCase());
      return matchedTitle;
    } else if (authorFilter !== '') {
      const matchedAuthor = book.author
        .toLowerCase()
        .includes(authorFilter.toLowerCase());
      return matchedAuthor;
    } else {
      return book;
    } */
    const matchedTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());

    const matchedAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());

    const matchedFavorite = favoriteFilter ? book.isFavorite : true;

    return matchedTitle && matchedAuthor && matchedFavorite;
  });

  const hihglightMatch = (text, filter) => {
    if (!filter) return text;
    const regex = new RegExp(`(${filter})`, `gi`);
    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

  return (
    <div className="app-block book-list">
      <h1>book list</h1>
      {books.length === 0 ? (
        <h2>No books available</h2>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. {hihglightMatch(book.title, titleFilter)} by{' '}
                <strong>{hihglightMatch(book.author, authorFilter)} </strong> (
                {book.source})
              </div>
              <div className="book-actions">
                <span onClick={() => handleToggleFavorite(book.id)}>
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>

                <button onClick={() => handleDelete(book.id)}>delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
