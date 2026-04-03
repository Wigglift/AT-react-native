import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

const BottomBar = ({ onSignOut }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = theme.colors;

  return (
    <View style={[styles.bottomBar, { 
      backgroundColor: colors.surface, 
      borderTopColor: colors.outlineVariant 
    }]}>
      
      <TouchableOpacity 
        style={styles.navButton} 
        onPress={onSignOut}
        activeOpacity={0.6}
      >
        <MaterialIcons name="logout" size={24} color={colors.error} />
        <Text style={[styles.navText, { color: colors.error }]}>Sair</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navButton} 
        onPress={() => router.push('/ProfileScreen')}
        activeOpacity={0.6}
      >
        <FontAwesome name="user" size={24} color={colors.primary} />
        <Text style={[styles.navText, { color: colors.primary }]}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navButton} 
        onPress={() => router.push('/')}
        activeOpacity={0.6}
      >
        <FontAwesome name="home" size={24} color={colors.primary} />
        <Text style={[styles.navText, { color: colors.primary }]}>Filmes</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navButton} 
        onPress={() => router.push('/FavoritesScreen')}
        activeOpacity={0.6}
      >
        <FontAwesome name="star" size={24} color={colors.primary} />
        <Text style={[styles.navText, { color: colors.primary }]}>Favoritos</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navButton} 
        onPress={() => router.push('/SettingsScreen')}
        activeOpacity={0.6}
      >
        <FontAwesome name="gear" size={24} color={colors.primary} />
        <Text style={[styles.navText, { color: colors.primary }]}>Ajustes</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    height: 100,
    borderTopWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: - 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 20,
    width: '100%', 
    position: 'absolute', 
    bottom:0,
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

export default BottomBar;