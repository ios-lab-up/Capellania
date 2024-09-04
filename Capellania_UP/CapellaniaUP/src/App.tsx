import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardHome from './pages/dashboard/DashboardHome';
import AddMass from './pages/dashboard/AddMass';
import AddEvent from './pages/dashboard/AddEvent';
import AddNotice from './pages/dashboard/AddNotice';
import AddNewsletter from './pages/dashboard/AddNewsletter'; // Nuevo componente
import Home from './pages/public/Home';
import ViewMasses from './pages/public/ViewMasses';
import ViewEvents from './pages/public/ViewEvents';
import ViewNotices from './pages/public/ViewNotices';
import Login from './pages/public/Login';
import { UserProvider } from './context/UserContext';
import AddReadings from './pages/dashboard/AddReading';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/masses" element={<ViewMasses />} />
              <Route path="/events" element={<ViewEvents />} />
              <Route path="/notices" element={<ViewNotices />} />
              <Route path="/dashboard" element={<ProtectedRoute roles={['capellan']} element={<DashboardHome />} />} />
              <Route path="/dashboard/add-mass" element={<ProtectedRoute roles={['capellan']} element={<AddMass />} />} />
              <Route path="/dashboard/add-event" element={<ProtectedRoute roles={['capellan']} element={<AddEvent />} />} />
              <Route path="/dashboard/add-notice" element={<ProtectedRoute roles={['capellan']} element={<AddNotice />} />} />
              <Route path="/dashboard/add-newsletter" element={<ProtectedRoute roles={['capellan']} element={<AddNewsletter />} />} />
              <Route path="/dashboard/add-readings" element={<ProtectedRoute roles={['capellan']} element={<AddReadings />} />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
