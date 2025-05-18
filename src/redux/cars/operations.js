

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://car-rental-api.goit.global/';

// === Получить список машин с фильтрацией ===
export const fetchCarsThunk = createAsyncThunk(
  'cars/fetchAll',
  async (filters = {}, thunkAPI) => {
    try {
      const params = {
        limit: 8,
        page: 1,
        ...filters,
      };
      const { data, headers } = await axios.get('/cars', { params });
      const totalCount = Number(headers['x-total-count']);
      const totalPages = Math.ceil(totalCount / params.limit);

      return { cars: data, totalPages, currentPage: 1 };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// === Дозагрузить следующую страницу ===
export const fetchMoreCarsThunk = createAsyncThunk(
  'cars/fetchMore',
  async (nextPage, thunkAPI) => {
    const state = thunkAPI.getState();
    const filters = state.cars.filters;

    try {
      const params = {
        limit: 8,
        page: nextPage,
        ...filters,
      };
      const { data } = await axios.get('/cars', { params });

      return { cars: data, currentPage: nextPage };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// === Получить авто по id ===
export const fetchCarsByIdThunk = createAsyncThunk(
  'cars/fetchById',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/cars/${id}`);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// === Добавить/удалить из избранного (на клиенте!) ===
export const toggleFavoriteThunk = createAsyncThunk(
  'cars/toggleFavorite',
  async (id, thunkAPI) => {
    try {
      // На клиенте просто возвращаем id — обработка будет в редюсере
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

