import type { Translations } from '../types';
import { common } from './common';
import { navigation } from './navigation';
import { status } from './status';
import { landing } from './landing';
import { application } from './application';
import { dashboard } from './dashboard';
import { settings } from './settings';
import { feedback } from './feedback';
import { validation } from './validation';

export const translations: Translations = {
  fr: {
    common: common.fr,
    nav: navigation.fr,
    status: status.fr,
    landing: landing.fr,
    app: application.fr,
    dashboard: dashboard.fr,
    settings: settings.fr,
    feedback: feedback.fr,
    validation: validation.fr,
  },
  en: {
    common: common.en,
    nav: navigation.en,
    status: status.en,
    landing: landing.en,
    app: application.en,
    dashboard: dashboard.en,
    settings: settings.en,
    feedback: feedback.en,
    validation: validation.en,
  },
};
