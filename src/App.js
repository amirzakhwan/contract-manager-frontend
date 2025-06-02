import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Register from './components/Register';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ContractsList from './components/ContractsList';
import ContractForm from './components/ContractForm';
import Responsibilities from './components/Responsibilities';
import Approvals from './components/Approvals';
import Expiry from './components/Expiry';
import Overview from './components/Overview';

const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* MOVE THIS OUTSIDE */}

          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            <Route path="contracts" element={<ContractsList />} />
            <Route path="contracts/new" element={<ContractForm />} />
            <Route path="contracts/edit/:id" element={<ContractForm />} />
            <Route path="responsibilities" element={<Responsibilities />} />
            <Route path="approvals" element={<Approvals />} />
            <Route path="expiry" element={<Expiry />} />
            <Route path="overview" element={<Overview />} />
          </Route> {/* Close the /dashboard Route */}
        </Routes> {/* Close Routes */}
      </Router>
    </AuthProvider>
  );
}

export default App;

