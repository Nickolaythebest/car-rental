import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCarsThunk,
  fetchMoreCarsThunk,
  fetchCarsByIdThunk,
  toggleFavoriteThunk,
} from './operations';


const initialState = {
  cars: [],
  page: 1,
  totalPages: 4,
  isLoading: false,
  error: null,
  filters: {},
  favorites: [],
  selectedCar: null,
};


export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    resetCars(state) {
      state.cars = [];
      state.page = 1;
      state.totalPages = 1;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // === FETCH ===
      .addCase(fetchCarsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCarsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cars = action.payload.cars;   // cars — массив
        state.totalPages = Number(action.payload.totalPages);
        state.page = Number(action.payload.currentPage);
        state.filters = action.meta.arg;    // Можно сохранять текущие фильтры
      })
      
      .addCase(fetchCarsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // === LOAD MORE ===
      .addCase(fetchMoreCarsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMoreCarsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cars = [...state.cars, ...action.payload.cars];  // корректно объединяем массивы
        state.page = Number(action.payload.currentPage);
      })
      
      .addCase(fetchMoreCarsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // === FAVORITE TOGGLE ===
      .addCase(toggleFavoriteThunk.fulfilled, (state, action) => {
        const id = action.payload;
        if (state.favorites.includes(id)) {
          state.favorites = state.favorites.filter((favId) => favId !== id);
        } else {
          state.favorites.push(id);
        }
      })

      // === FETCH CAR BY ID ===
      .addCase(fetchCarsByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.selectedCar = null;
      })
      .addCase(fetchCarsByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCar = action.payload;
      })
      .addCase(fetchCarsByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.selectedCar = null;
      });
  },
});

export const { resetCars } = carsSlice.actions;
export default carsSlice.reducer;
