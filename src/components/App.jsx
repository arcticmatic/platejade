import { Routes, Route } from 'react-router-dom';
import AppBar from './AppBar';
import DealersPage from './DealersPage';
import AddDealer from './AddDealer';
import Users from './Users';
import LicensePlates from './LicensePlates';
import EditDealer from './EditDealer';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppBar />}>
          <Route index element={<DealersPage />} />
          <Route path="/license-plates" element={<LicensePlates />} />
          <Route path="/plate-frame" />
          <Route path="/users" element={<Users />} />
          <Route path="/dealers" />
          <Route path="/add-dealer" element={<AddDealer />} />
          <Route path="/edit-dealer" element={<EditDealer />} />
        </Route>
      </Routes>
    </>
  );
};
