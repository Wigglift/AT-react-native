import React, { useEffect } from 'react';
import { View, TextInput, FlatList, ActivityIndicator, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useMovie } from '../hooks/useMovie';
import MovieItem from '../components/MovieItem';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; 
import { useTheme } from '../context/ThemeContext';
import BottomBar from '../components/BottomBar';

export default function MoviesScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();
  const colors = theme.colors;

  const { 
    data, 
    loading, 
    loadingMore, 
    error, 
    searchQuery, 
    handleSearch, 
    loadMore 
  } = useMovie();

  useEffect(() => {
    if (!user) {
      router.replace('/LoginScreen');
    }
  }, [user]);

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  };

  if (!user) {
    return (
      <View style={[styles.mainLoader, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 10, color: colors.onSurface }}>Verificando acesso...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* HEADER / BUSCA */}
      <TextInput
        style={[
          styles.searchInput, 
          { 
            backgroundColor: colors.surfaceVariant, 
            color: colors.onSurfaceVariant,
            borderColor: colors.outline 
          }
        ]}
        placeholder="Buscar filmes pelo título..."
        placeholderTextColor={colors.onSurfaceVariant + '70'}
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {error && <Text style={[styles.errorText, { color: colors.error }]}>Erro: {error}</Text>}

      {/* LISTA DE FILMES */}
      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={styles.mainLoader} />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieItem movie={item} />}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5} 
            ListFooterComponent={renderFooter}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              !loading && (
                <Text style={[styles.emptyText, { color: colors.onSurfaceVariant }]}>
                  Nenhum filme encontrado.
                </Text>
              )
            }
          />
        )}
      </View>
      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    margin: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  mainLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLoader: {
    paddingVertical: 20,
  },
  errorText: {
    textAlign: 'center',
    margin: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    height: 70,
    bottom: 40,
    borderTopWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10, // Espaço para quem usa gestos no iOS/Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});