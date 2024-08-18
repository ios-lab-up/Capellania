import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardHome from './pages/dashboard/DashboardHome';
import AddMass from './pages/dashboard/AddMass';
import AddEvent from './pages/dashboard/AddEvent';
import AddNotice from './pages/dashboard/AddNotice';
import Home from './pages/public/Home';
import ViewMasses from './pages/public/ViewMasses';
import ViewEvents from './pages/public/ViewEvents';
import ViewNotices from './pages/public/ViewNotices';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/masses" element={<ViewMasses />} />
            <Route path="/events" element={<ViewEvents />} />
            <Route path="/notices" element={<ViewNotices />} />
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/dashboard/add-mass" element={<AddMass />} />
            <Route path="/dashboard/add-event" element={<AddEvent />} />
            <Route path="/dashboard/add-notice" element={<AddNotice />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
