import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FileStoragePage from './pages/FileStoragePage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter basename='/dashboard'>
      <Routes>
        <Route path='/' element={<FileStoragePage />} />
        <Route path='/analytics' element={<DashboardPage />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
