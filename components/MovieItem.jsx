import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MovieItem = ({ movie }) => {
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=Sem+Poster'; // Fallback caso não tenha imagem

  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'Ano desconhecido';

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.poster} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
        <Text style={styles.year}>{releaseYear}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  poster: {
    width: 60,
    height: 90,
    borderRadius: 5,
    backgroundColor: '#e1e4e8',
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
    color: '#666',
  },
});

export default MovieItem;