import React, { lazy } from 'react';
import Header from './Components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const FeedBackPage = lazy(() => import("./Pages/FeedBackPage"));
const TablePage = lazy(() => import("./Pages/TablePage"));

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<FeedBackPage />} />
          <Route path='/table' element={<TablePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
