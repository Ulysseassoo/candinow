import { createFileRoute } from '@tanstack/react-router';
// TODO: Importer le composant une fois créé
// import { ApplicationsList } from '../views/ApplicationsList';

export const Route = createFileRoute('/app/')({
  component: ApplicationsListPage,
});

function ApplicationsListPage() {
  return (
    <>
      {/* <ApplicationsList /> */}
      <div className="p-8">ApplicationsList - À implémenter</div>
    </>
  );
}
