import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBook from '../../utils/createBook';
import { setError } from './errorSlice';
const initialState = {
  books: [],
  isLoadingViaAPI: false,
};

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      // one option
      return thunkAPI.rejectWithValue(error);
      // second option
      //throw error;
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      // state.books.push(action.payload) one option
      return [...state, action.payload]; // second option
    },
    deleteBook: (state, action) => {
      /* const index = state.findIndex((book) => book.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      } One option */
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      }; // Second option
    },
    toggleFavorite: (state, action) => {
      /*  return state.map((book) =>
        book.id === action.payload
          ? {
              ...book,
              isFavorite: !book.isFavorite,
            }
          : book
      ); One Option */

      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      }); // Second Option
    },
  },
  /*   extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state, action) => {
      state.isLoadingViaAPI = true;
    });
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action.payload.title && action.payload.author) {
        state.books.push(createBook(action.payload, 'API'));
      }
    });
    builder.addCase(fetchBook.rejected, (state, action) => {
      state.isLoadingViaAPI = false;
    });
  }, */
  extraReducers: {
    [fetchBook.pending]: (state) => {
      state.isLoadingViaAPI = true;
    },
    [fetchBook.fulfilled]: (state, action) => {
      state.isLoadingViaAPI = false;
      if (action?.payload?.title && action?.payload?.author) {
        state.books.push(createBook(action.payload, 'API'));
      }
    },
    [fetchBook.rejected]: (state) => {
      state.isLoadingViaAPI = false;
    },
  },
});
export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const selectBooks = (state) => state.books.books;
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;

export default booksSlice.reducer;
