import { Shield } from 'lucide-react';

export const PrivacySection = () => {
  return (
    <div className="bg-primary-soft/30 p-6 rounded-ui border border-primary/10">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-white rounded-xl text-primary shadow-sm">
          <Shield size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-primary">Tes données t'appartiennent</h3>
          <p className="text-text-secondary text-sm mt-1">
            Candinow est offline-first. Tes candidatures sont stockées localement sur ce navigateur. 
            Pas de serveur = vie privée respectée.
          </p>
        </div>
      </div>
    </div>
  );
};

