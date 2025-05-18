export const selectCars = (state) => state.cars.cars;
export const selectLoading = (state) => state.cars.isLoading;
export const selectError = (state) => state.cars.error;

export const selectPage = (state) => Number(state.cars.page);

export const selectTotalPages = (state) => Number(state.cars.totalPages);



export const selectFavorites = (state) => state.cars.favorites;
export const selectSelectedCar = (state) => state.cars.selectedCar;
