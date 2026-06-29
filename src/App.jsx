import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FileStoragePage from './pages/FileStoragePage';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path='/' element={<FileStoragePage />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
