import React, { useEffect } from 'react';
import { View, TextInput, FlatList, ActivityIndicator, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useMovie } from '../hooks/useMovie';
import MovieItem from '../components/MovieItem';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; // Importando ícones para ficar mais profissional

export default function MoviesScreen() {
  // 1. Puxando o signOut do useAuth
  const { user, signOut } = useAuth();
  const router = useRouter();

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
  }, [user]); // Adicionado user como dependência para segurança

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  if (!user) {
    return (
      <View style={[styles.mainLoader, { backgroundColor: '#fff' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Verificando acesso...</Text>
      </View>
    );
  }

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
      <TouchableOpacity 
        style={styles.floatingButton} 
        onPress={() => signOut()}
        activeOpacity={0.7}
      >
        <MaterialIcons name="logout" size={24} color="#FFF" />
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
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

  // NOVO ESTILO PARA O BOTÃO
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#FF3B30', 
    flexDirection: 'row',       
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    // Sombras
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});