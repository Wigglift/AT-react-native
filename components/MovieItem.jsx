import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext'; // Importando seu hook de tema
import { database } from '../services/Database';

const MovieItem = ({ movie }) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=Sem+Poster';

  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'Ano desconhecido';

  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const checkIfFavorite = async () => {
    const fav = await database.isFavorite(movie.id);
    setIsFav(fav);
  };

  const toggleFavorite = async () => {
    if (isFav) {
      await database.removeFavorite(movie.id);
    } else {
      await database.saveFavorite(movie);
    }
    setIsFav(!isFav);
  };

  return (
    <View style={[styles.container, { borderBottomColor: colors.outlineVariant }]}>
      <Image 
        source={{ uri: imageUrl }} 
        style={[styles.poster, { backgroundColor: colors.surfaceVariant }]} 
      />
      <View style={styles.info}>
        <Text 
          style={[styles.title, { color: colors.onSurface }]} 
          numberOfLines={2}
        >
          {movie.title}
        </Text>
        <Text style={[styles.year, { color: colors.onSurfaceVariant }]}>
          {releaseYear}
        </Text>
      </View>
      <TouchableOpacity onPress={toggleFavorite}>
        <MaterialIcons 
          name={isFav ? "favorite" : "favorite-border"} 
          size={28} 
          color={isFav ? "red" : colors.onSurfaceVariant} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1, // A cor agora é dinâmica via inline style
    alignItems: 'center',
  },
  poster: {
    width: 60,
    height: 90,
    borderRadius: 5,
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  year: {
    fontSize: 14,
  },
});

export default MovieItem;