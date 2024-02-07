import { Routes, Route } from 'react-router-dom';
import AppBar from './AppBar';
import DealersPage from './DealersPage';
import AddDealer from './AddDealer';
import Users from './Users';
import LicensePlates from './LicensePlates';
import EditDealer from './EditDealer';
import AddLicensePlate from './AddLicensePlate';
import PlatesFrames from './PlatesFrames';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppBar />}>
          {/* <Route index element={<LogIn />} /> */}
          <Route path="/license-plates" element={<LicensePlates />} />
          <Route path="/add-license-plate" element={<AddLicensePlate />} />
          <Route path="/plate-frame" element={<PlatesFrames />} />
          <Route path="/users" element={<Users />} />
          <Route path="/dealers" element={<DealersPage />} />
          <Route path="/add-dealer" element={<AddDealer />} />
          <Route path="/edit-dealer" element={<EditDealer />} />
        </Route>
      </Routes>
    </>
  );
};
