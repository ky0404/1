import { Routes, Route } from 'react-router-dom';
import { routes, createPageRoute } from '@/routes/lazy-pages';

function App() {
  return (
    <Routes>
      {routes.map((r) => (
        <Route key={r.path} path={r.path} element={createPageRoute(r.component)} />
      ))}
    </Routes>
  );
}

export default App;