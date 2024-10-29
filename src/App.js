import './global.css';

import { Link, Outlet } from 'react-router-dom';

function Links() {
  return (
    <ul className="inline-flex gap-3 border p-1">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/list">List</Link>
      </li>
      <li>
        <Link to="/post/1">Post</Link>
      </li>
      <li>
        <Link to="/post/1/answer">Answer</Link>
      </li>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
    </ul>
  );
}

export default function App() {
  return (
    <main>
      <Links />
      <Outlet />
    </main>
  );
}
