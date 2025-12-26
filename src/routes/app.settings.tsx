import { createFileRoute } from '@tanstack/react-router';
// TODO: Importer le composant une fois créé
// import { Settings } from '../views/Settings';

export const Route = createFileRoute('/app/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <>
      {/* <Settings /> */}
      <div className="p-8">Settings - À implémenter</div>
    </>
  );
}
