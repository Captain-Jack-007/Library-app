import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
  onlyFavorite: false,
};

const filterSlice = createSlice({
  name: 'Reducer', // Name of the reducer
  initialState, // instead of initialState : initialState
  reducers: {
    setTitleFilter: (state, action) => {
      return { ...state, title: action.payload }; // initialState equals to {}
    },
    resetFilter: () => {
      return initialState;
    },
    setAuthorFilter: (state, action) => {
      return { ...state, author: action.payload }; // initialState equals to {}
    },
    setFavoriteFilter: (state) => {
      return { ...state, onlyFavorite: !state.onlyFavorite }; // initialState equals to {}
    },
  },
});
// const setTitleFilter  = filterSlice.actions.setTitleFilter
export const {
  setTitleFilter,
  setFavoriteFilter,
  setAuthorFilter,
  resetFilter,
} = filterSlice.actions;
export const filterTitle = (state) => state.filter.title;
export const filterAuthor = (state) => state.filter.author;
export const filterOnlyFavorite = (state) => state.filter.onlyFavorite;
export default filterSlice.reducer;
