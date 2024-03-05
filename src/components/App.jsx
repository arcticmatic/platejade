import { Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { authSelectors } from '../redux/auth';
// import { authOperations } from '../redux/auth';
import PrivateRoute from '../components/Routes/PrivateRoute';
// import PublicRoute from '../components/Routes/PublicRoute';
import AppBar from './AppBar';
import DealersPage from './DealersPage';
import AddDealer from './AddDealer';
import Users from './Users';
import LicensePlates from './LicensePlates';
import EditDealer from './EditDealer';
import AddLicensePlate from './AddLicensePlate';
import AddLicensePlateFrame from './AddLicensePlateFrame';
import PlatesFrames from './PlatesFrames';
import EditLicensePlate from './EditLicensePlate';
import EditLicensePlateFrame from './EditLicensePlateFrame';
import LogIn from './LogIn';

export const App = () => {
  // const dispatch = useDispatch();
  // const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);

  // useEffect(() => {
  //   dispatch(authOperations.fetchCurrentUser());
  // }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<AppBar />}>
          <Route
            index
            element={
              <PrivateRoute>
                <LicensePlates />
              </PrivateRoute>
            }
          />

          <Route
            path="/add-license-plate"
            element={
              <PrivateRoute>
                <AddLicensePlate />
              </PrivateRoute>
            }
          />
          <Route
            path="/plate-frame"
            element={
              <PrivateRoute>
                <PlatesFrames />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-plate-frame"
            element={
              <PrivateRoute>
                <AddLicensePlateFrame />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-license-plate"
            element={
              <PrivateRoute>
                <EditLicensePlate />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-license-plate-frame"
            element={
              <PrivateRoute>
                <EditLicensePlateFrame />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/dealers"
            element={
              <PrivateRoute>
                <DealersPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-dealer"
            element={
              <PrivateRoute>
                <AddDealer />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-dealer"
            element={
              <PrivateRoute>
                <EditDealer />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};
