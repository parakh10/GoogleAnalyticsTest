// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Property from './pages/Property';
import { initDataLayer } from './utils/analytics';

// Initialize the dataLayer before the app renders so events are captured
// even if GTM loads slightly later.
initDataLayer();

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Dynamic property pages keyed by slug (e.g. /narendra-bhawan). */}
          <Route path=":slug" element={<Property />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
