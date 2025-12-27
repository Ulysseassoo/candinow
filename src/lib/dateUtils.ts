import moment from 'moment';

moment.locale('fr');

/**
 * Formate une date ISO en format français
 */
export const formatDate = (dateString: string, format: string = 'DD/MM/YYYY'): string => {
  return moment(dateString).format(format);
};

/**
 * Calcule le nombre de jours entre une date et aujourd'hui
 */
export const getDaysSince = (dateString: string): number => {
  return moment().diff(moment(dateString), 'days');
};

/**
 * Retourne la date d'aujourd'hui au format ISO (YYYY-MM-DD)
 */
export const getTodayISO = (): string => {
  return moment().format('YYYY-MM-DD');
};

/**
 * Retourne la date d'aujourd'hui au format ISO complet
 */
export const getTodayISOString = (): string => {
  return moment().toISOString();
};

/**
 * Formate une date pour un input de type date (YYYY-MM-DD)
 */
export const formatDateForInput = (dateString: string): string => {
  return moment(dateString).format('YYYY-MM-DD');
};

/**
 * Formate une date en format court français (ex: "15 jan")
 */
export const formatDateShort = (dateString: string): string => {
  return moment(dateString).format('DD MMM');
};

/**
 * Formate une date en format long français (ex: "15 janvier 2024")
 */
export const formatDateLong = (dateString: string): string => {
  return moment(dateString).format('DD MMMM YYYY');
};

/**
 * Compare deux dates pour le tri
 */
export const compareDates = (dateA: string, dateB: string): number => {
  return moment(dateA).valueOf() - moment(dateB).valueOf();
};

