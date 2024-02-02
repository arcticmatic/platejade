import { Routes, Route } from 'react-router-dom';
import AppBar from './AppBar';
import DealersPage from './DealersPage';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppBar />}>
          <Route index element={<DealersPage />} />
        </Route>
      </Routes>
    </>
  );
};
