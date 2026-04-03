import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { useEffect } from 'react';
import { initializeDb } from '../services/Database';

export default function Layout() {

  useEffect(() => {
    initializeDb();
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="Home" options={{ headerShown: false }} />
          <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
          <Stack.Screen name="RegisterScreen" options={{ headerShown: false }} />
          <Stack.Screen name="SettingsScreen" options={{ headerShown: false }} />
          <Stack.Screen name="FavoritesScreen" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}