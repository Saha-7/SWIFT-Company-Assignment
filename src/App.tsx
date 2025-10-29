
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import type { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();

        const randomIndex = Math.floor(Math.random() * data.length);
        setUser(data[randomIndex]);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header userName={user?.name} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Pass user as prop to Profile */}
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;