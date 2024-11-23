export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      global: {
        home: "Home",
        stats: "Stats",
        about: "About",
        madeBy: "Made by",
      },
      game: {
        restart: "Restart",
        finish: "Finish",
        undo: "Undo",
        redo: "Redo",
      },
      stats: {
        title: "Your solitaire statistics",
        table: {
          header: {
            date: "Date",
            time: "Time",
            score: "Score",
          },
          reset: "Reset statistics",
        },
      },
      about: {},
    },
    de: {
      global: {
        home: "Start",
        stats: "Statistiken",
        about: "Über",
        madeBy: "Erstellt von",
      },
      game: {
        restart: "Neustart",
        finish: "Beenden",
        undo: "Zurück",
        redo: "Vor",
      },
      stats: {
        title: "Ihre Solitär Statistiken",
        table: {
          header: {
            date: "Datum",
            time: "Zeit",
            score: "Punktzahl",
          },
          reset: "Daten zurücksetzen",
        },
      },
      about: {},
    },
    fr: {
      global: {
        home: "Accueil",
        stats: "Statistiques",
        about: "Informations",
        madeBy: "Crée par",
      },
      game: {
        restart: "Redémarrage",
        finish: "Finition",
        undo: "Défaire",
        redo: "Refaire",
      },
      stats: {
        title: "Vos statistiques de solitaire",
        table: {
          header: {
            date: "Date",
            time: "Temps",
            score: "Score",
          },
          reset: "Réinitialiser les statistiques",
        },
      },
      about: {},
    },
  },
}));
