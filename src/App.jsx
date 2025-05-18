import { Routes, Route } from "react-router-dom";
import './App.css';

import Loader from "./components/Loader/Loader.jsx";
import { lazy, Suspense } from "react";
import HomePage from './pages/HomePage/HomePage.jsx'
import Layout from "./components/Layout.jsx";

const CatalogPage = lazy(() => import('./pages/CatalogPage.jsx'));
const CarPage = lazy(() => import('./pages/CarPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:id" element={<CarPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
