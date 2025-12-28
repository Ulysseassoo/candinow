import type { JobApplication } from '@/types/JobApplication';
import { getTodayISO } from '@/lib/dateUtils';

export const exportToJSON = (applications: JobApplication[]): void => {
  const dataStr = JSON.stringify(applications, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', `candinow_backup_${getTodayISO()}.json`);
  linkElement.click();
};

export const exportToCSV = (applications: JobApplication[]): void => {
  if (applications.length === 0) return;
  
  const headers = ['id', 'title', 'company', 'status', 'appliedAt', 'location', 'domain'].join(',');
  const rows = applications.map(app => 
    [app.id, app.title, app.company, app.status, app.appliedAt, app.location || '', app.domain || '']
      .map(val => `"${String(val).replace(/"/g, '""')}"`)
      .join(',')
  ).join('\n');
  
  const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'candinow_export.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

