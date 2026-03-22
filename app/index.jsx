import React from 'react';
import { View, TextInput, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useMovie } from '../hooks/useMovie';
import MovieItem from '../components/MovieItem';

export default function MoviesScreen() {
  const { 
    data, 
    loading, 
    loadingMore, 
    error, 
    searchQuery, 
    handleSearch, 
    loadMore 
  } = useMovie();

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar filmes pelo título..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {error && <Text style={styles.errorText}>Erro: {error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.mainLoader} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieItem movie={item} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5} 
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            !loading && <Text style={styles.emptyText}>Nenhum filme encontrado.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    margin: 10,
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
    color: 'red',
    textAlign: 'center',
    margin: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});