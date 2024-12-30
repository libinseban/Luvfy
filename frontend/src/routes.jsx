import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Communities from './pages/Communities';
import Events from './pages/Events';
import ModerationDashboard from './pages/ModearationDashboard.jsx';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/communities" element={<Communities />} />
      <Route path="/events" element={<Events />} />
      <Route path="/moderation-dashboard" element={<ModerationDashboard />} />
    </Routes>
  );
};

export default Router;
