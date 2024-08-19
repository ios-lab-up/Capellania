import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardHome from './pages/dashboard/DashboardHome';
import AddMass from './pages/dashboard/AddMass';
import AddEvent from './pages/dashboard/AddEvent';
import AddNotice from './pages/dashboard/AddNotice';
import Home from './pages/public/Home';
import ViewMasses from './pages/public/ViewMasses';
import ViewEvents from './pages/public/ViewEvents';
import ViewNotices from './pages/public/ViewNotices';
import Login from './pages/public/Login';

const App: React.FC = () => {
  return (
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
            <Route path="/dashboard" element={<ProtectedRoute element={<DashboardHome />} roles={['capellan']} />} />
            <Route path="/dashboard/add-mass" element={<ProtectedRoute element={<AddMass />} roles={['capellan']} />} />
            <Route path="/dashboard/add-event" element={<ProtectedRoute element={<AddEvent />} roles={['capellan']} />} />
            <Route path="/dashboard/add-notice" element={<ProtectedRoute element={<AddNotice />} roles={['capellan']} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
