import { createFileRoute } from '@tanstack/react-router';
// TODO: Importer le composant une fois créé
// import { Dashboard } from '../views/Dashboard';

export const Route = createFileRoute('/app/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <>
      {/* <Dashboard /> */}
      <div className="p-8">Dashboard - À implémenter</div>
    </>
  );
}
