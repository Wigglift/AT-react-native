import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('movies_db');

export const initializeDb = async () => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS favorite_movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        movie_id INTEGER UNIQUE,
        title TEXT NOT NULL,
        poster_path TEXT
      );
    `);
    console.log("Banco de dados inicializado com sucesso");
  } catch (error) {
    console.error("Erro ao inicializar banco de dados:", error);
  }
};

export const database = {
  saveFavorite: async (movie) => {
    return await db.runAsync(
      'INSERT INTO favorite_movies (movie_id, title, poster_path) VALUES (?, ?, ?);',
      [movie.id, movie.title, movie.poster_path]
    );
  },


  removeFavorite: async (movieId) => {
    return await db.runAsync('DELETE FROM favorite_movies WHERE movie_id = ?;', [movieId]);
  },


  getAllFavorites: async () => {
    return await db.getAllAsync('SELECT * FROM favorite_movies;');
  },


  isFavorite: async (movieId) => {
    const result = await db.getFirstAsync(
      'SELECT movie_id FROM favorite_movies WHERE movie_id = ?;',
      [movieId]
    );
    return !!result;
  }
};