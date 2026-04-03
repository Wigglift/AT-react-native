import React, { useState, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { database } from '../services/Database';
import MovieItem from '../components/MovieItem';
import BottomBar from '../components/BottomBar';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  const { theme } = useTheme();
  const { signOut } = useAuth();
  const colors = theme.colors;

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    const data = await database.getAllFavorites();
    const formattedData = data.map(item => ({
      ...item,
      id: item.movie_id 
    }));
    setFavorites(formattedData);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.onSurface }]}>Meus Favoritos</Text>
        
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieItem movie={item} />}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: colors.onSurfaceVariant }]}>
              Você ainda não tem filmes favoritos.
            </Text>
          }
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>
      
      <BottomBar onSignOut={signOut} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingTop: 50 },
  title: { fontSize: 28, fontWeight: 'bold', marginHorizontal: 20, marginBottom: 20 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16 }
});