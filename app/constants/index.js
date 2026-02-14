// Application constants
export const APP_CONFIG = {
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },
  AUTH: {
    TOKEN_KEY: 'authToken',
    TOKEN_EXPIRY: '24h',
  },
  VALIDATION: {
    PASSWORD_MIN_LENGTH: 6,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    REASON_MAX_LENGTH: 500,
  },
  UI: {
    TOAST_AUTO_CLOSE: 5000,
    TOAST_POSITION: 'top-right',
  },
  DATE_FORMAT: {
    LOCALE: 'fr-FR',
    OPTIONS: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  },
};

export const ERROR_MESSAGES = {
  VALIDATION: {
    NAME_REQUIRED: 'Le nom est requis',
    DATE_REQUIRED: 'La date est requise',
    REASON_REQUIRED: 'La raison est requise',
    DATE_FUTURE: 'La date ne peut pas être dans le futur',
    NAME_TOO_LONG: 'Le nom est trop long',
    REASON_TOO_LONG: 'La raison est trop longue',
  },
  API: {
    FETCH_FAILED: 'Échec de la récupération des données',
    CREATE_FAILED: 'Erreur lors de l\'enregistrement',
    DELETE_FAILED: 'Erreur lors de la suppression',
    AUTH_FAILED: 'Échec de l\'authentification',
  },
  SUCCESS: {
    ABSENCE_CREATED: 'Absence enregistree avec succes',
    ABSENCE_DELETED: 'Absence supprimée avec succès',
  },
};

export const UI_TEXTS = {
  COMMON: {
    LOADING: 'Chargement...',
    SEARCH: 'Rechercher',
    CANCEL: 'Annuler',
    DELETE: 'Supprimer',
    CONFIRM: 'Confirmer',
  },
  ABSENCES: {
    TITLE: 'Ajouter une absence',
    LIST_TITLE: 'Liste des absences',
    NAME_LABEL: 'Nom *',
    DATE_LABEL: 'Date *',
    REASON_LABEL: 'Raison *',
    NAME_PLACEHOLDER: 'Nom de la personne',
    REASON_PLACEHOLDER: 'Raison de l\'absence',
    ADD_BUTTON: 'Ajouter l\'absence',
    SAVING: 'Enregistrement...',
    DELETE_CONFIRMATION: 'Confirmation de suppression',
    DELETE_WARNING: 'Êtes-vous sûr de vouloir supprimer cette absence ? Cette action est irréversible.',
    NO_ABSENCES: 'Aucune absence enregistrée.',
    NO_SEARCH_RESULTS: 'Aucune absence trouvée pour cette recherche.',
    LOADING_ABSENCES: 'Chargement des absences...',
    SEARCH_PLACEHOLDER: 'Rechercher par nom ou raison...',
    SEARCH_BUTTON: 'Rechercher',
    DELETE_BUTTON: 'Supprimer',
    CANCEL_BUTTON: 'Annuler',
    DELETE_TITLE: 'Supprimer',
  },
  DASHBOARD: {
    WELCOME: 'Bienvenue',
    SUBTITLE: 'Gérez vos absences et suivez votre équipe depuis votre tableau de bord.',
  },
  FOOTER: {
    COMPANY_DESCRIPTION: 'Plateforme moderne de gestion des absences pour entreprises et établissements. Simplifiez la gestion de votre équipe avec nos outils intuitifs.',
    SUPPORT_HOURS: 'Support disponible du lundi au vendredi, 9h-18h',
    COPYRIGHT: 'Tous droits réservés.',
    FEATURES: {
      ABSENCE_MANAGEMENT: 'Gestion des absences',
      DASHBOARDS: 'Tableaux de bord',
      ADVANCED_STATS: 'Statistiques avancées',
      EXPORTABLE_REPORTS: 'Rapports exportables',
      RESPONSIVE_INTERFACE: 'Interface responsive',
    },
    SECTIONS: {
      COMPANY_INFO: 'Gestion Absences',
      QUICK_LINKS: 'Liens Rapides',
      FEATURES: 'Fonctionnalités',
      CONTACT: 'Contact',
    },
    LINKS: {
      PRIVACY: 'Politique de confidentialité',
      TERMS: 'Conditions d\'utilisation',
      HELP: 'Aide',
    },
  },
  NAVIGATION: {
    ACTIVE_STATE: {
      BACKGROUND: 'bg-magenta text-white shadow-lg transform scale-105',
      HOVER: 'hover:text-magenta hover:bg-ghostwhite',
    },
  },
};
