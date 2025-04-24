import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Dashboard from './pages/Dashboard/Dashboard';

// don't need
import Settings from './pages/Settings';

// Housing Management Pages
import Buildings from './pages/Housing/Buildings';
import Rooms from './pages/Housing/Rooms';
import Contracts from './pages/Housing/Contracts';
import FormNewBuilding from './pages/Form/FormNewBuilding';
import Users from './pages/Users/Users';
import Residents from './pages/Users/Residents';
import Staff from './pages/Users/Staff';
import Applications from './pages/Applications/Applications';
import MaintenanceRequests from './pages/Incidents/MaintenanceRequests';
import MaintenanceRequestDetails from './pages/Incidents/MaintenanceRequestDetails';
import ApplicationDetails from './pages/Applications/ApplicationDetails';
import CreateMaintenance from './pages/Incidents/CreateMaintenance';
import ContractDetails from './pages/Housing/ContractDetails';
import RoomDetails from './pages/Housing/RoomDetails';
// Protected Route
import LayoutWrapper from './components/LayoutWrapper';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) return <Loader />;

  return (
    <Routes>
      <Route
        path="/auth/signin"
        element={
          <LayoutWrapper layout="auth">
            <PageTitle title="Signin | NU HMS" />
            <SignIn />
          </LayoutWrapper>
        }
      />

      {/* Protected Routes */}
      <Route>
        <Route
          path="/settings"
          element={
            <LayoutWrapper layout="default">
              <PageTitle title="Settings | NU HMS" />
              <Settings />
            </LayoutWrapper>
          }
        />

        {/* Housing Management Protected Routes */}
        <Route
          index
          element={
            <ProtectedRoute>
              <LayoutWrapper layout="default">
                <PageTitle title="NU | Housing Management System" />
                <Dashboard />
              </LayoutWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/housing/buildings"
          element={
            <LayoutWrapper layout="default">
              <PageTitle title="NU HMS | Buildings" />
              <Buildings />
            </LayoutWrapper>
          }
        />
        <Route
          path="/housing/rooms"
          element={
            <LayoutWrapper layout="default">
              <PageTitle title="NU HMS | Rooms" />
              <Rooms />
            </LayoutWrapper>
          }
        />
        <Route
          path="/housing/rooms/:id"
          element={
            <LayoutWrapper layout="default">
              <PageTitle title="NU HMS | Room Details" />
              <RoomDetails />
            </LayoutWrapper>
          }
        />
        <Route
          path="/housing/contracts"
          element={
            <LayoutWrapper layout="default">
              <PageTitle title="NU HMS | Contracts" />
              <Contracts />
            </LayoutWrapper>
          }
        />
        <Route
          path="/form/formnewbuilding"
          element={
            <LayoutWrapper layout="default">
              <PageTitle title="NU HMS | New Building Form" />
              <FormNewBuilding />
            </LayoutWrapper>
          }
        />
        <Route
          path="/users/users"
          element={
            <LayoutWrapper layout="default">
              <PageTitle title="NU HMS | Users" />
              <Users />
            </LayoutWrapper>
          }
        />
        <Route
          path="/users/residents"
          element={
            <LayoutWrapper layout="default">
              <PageTitle title="NU HMS | Residents" />
              <Residents />
            </LayoutWrapper>
          }
        />
        <Route
          path="/users/staff"
          element={
            <LayoutWrapper layout="default">
              <PageTitle title="NU HMS | Staff" />
              <Staff />
            </LayoutWrapper>
          }
        />
        <Route
          path="/applications"
          element={
            <LayoutWrapper layout="default">
              <PageTitle title="NU HMS | Applications" />
              <Applications />
            </LayoutWrapper>
          }
        />
        <Route
          path="/applications/:id"
          element={
            <LayoutWrapper layout="default">
              <PageTitle title="NU HMS | Application Details" />
              <ApplicationDetails />
            </LayoutWrapper>
          }
        />
      </Route>
      <Route
        path="/incidents/MaintenanceRequests"
        element={
          <LayoutWrapper layout="default">
            <PageTitle title="NU HMS | Maintenance Requests" />
            <MaintenanceRequests />
          </LayoutWrapper>
        }
      />
      <Route
        path="/maintenance/:id"
        element={
          <LayoutWrapper layout="default">
            <PageTitle title="NU HMS | Maintenance Requests" />
            <MaintenanceRequestDetails />
          </LayoutWrapper>
        }
      />
      <Route
        path="/maintenance/create"
        element={
          <LayoutWrapper layout="default">
            <PageTitle title="NU HMS | Create Maintenance Request" />
            <CreateMaintenance />
          </LayoutWrapper>
        }
      />
      <Route
        path="/housing/contracts/:id"
        element={
          <LayoutWrapper layout="default">
            <PageTitle title="NU HMS | Contract Details" />
            <ContractDetails />
          </LayoutWrapper>
        }
      />
    </Routes>
  );
}

export default App;
