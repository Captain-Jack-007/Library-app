import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBook,
  fetchBook,
  selectIsLoadingViaAPI,
} from '../../redux/slices/bookSlice';
import booksData from '../../data/books.json';
import './BookForm.css';
import { FaSpinner } from 'react-icons/fa';
import createBook from '../../utils/createBook';
import { setError } from '../../redux/slices/errorSlice';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch actions
    if (title && author) {
      const book = createBook({ title, author }, 'manual');
      dispatch(addBook(book));
    } else {
      dispatch(setError('You must fill the blank!'));
    }
    setTitle('');
    setAuthor('');
  };

  const handleRandomBook = () => {
    const RandomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[RandomIndex];
    dispatch(addBook(createBook(randomBook, 'random')));
  };

  const handleRandomBookViaAPI = () => {
    dispatch(fetchBook('http://localhost:4003/random-book-delayed'));
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            value={title}
            id="title"
            placeholder="Empty..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            value={author}
            id="author"
            placeholder="Empty..."
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add book</button>
        <button type="button" onClick={handleRandomBook}>
          Add Random
        </button>
        <button
          type="button"
          onClick={handleRandomBookViaAPI}
          disabled={isLoadingViaAPI}
        >
          {isLoadingViaAPI ? (
            <>
              <span>Loading book...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            'Add by API'
          )}
        </button>
      </form>
    </div>
  );
}

export default BookForm;
