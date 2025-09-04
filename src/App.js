import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from './intro/Intro';
import Main from './main/Main';
import Gallery from './main/Gallery';
import Letters from './main/Letters';
import ErrorPage from './intro/ErrorPage';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />

        <Route path="/main" element={<Main />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/letters" element={<Letters />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

