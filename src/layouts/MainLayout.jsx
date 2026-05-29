import { Link, Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
      <header className="header">
        
        <nav>
        </nav>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}