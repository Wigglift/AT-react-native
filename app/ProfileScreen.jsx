import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useImage } from '../hooks/useImage';
import { getAvatarSource, formatUserName } from '../utils/imageHelper';
import { MaterialIcons } from '@expo/vector-icons';
import BottomBar from '../components/BottomBar';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { theme } = useTheme();
  const { pickImage, takePhoto } = useImage();
  const [profileImage, setProfileImage] = useState(null);

  const colors = theme.colors;

  const handleUpdateImage = async (method) => {
    const result = method === 'camera' ? await takePhoto() : await pickImage();
    if (result) setProfileImage(result);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.onSurface }]}>Perfil</Text>

        <View style={styles.avatarContainer}>
          <Image 
            source={getAvatarSource(profileImage)} 
            style={[styles.avatar, { borderColor: colors.primary }]} 
          />
          
          <View style={styles.fabContainer}>
            <TouchableOpacity 
              style={[styles.fab, { backgroundColor: colors.primary }]}
              onPress={() => handleUpdateImage('camera')}
            >
              <MaterialIcons name="photo-camera" size={20} color={colors.onPrimary} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.fab, { backgroundColor: colors.secondary }]}
              onPress={() => handleUpdateImage('gallery')}
            >
              <MaterialIcons name="photo-library" size={20} color={colors.onSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.userName, { color: colors.onSurface }]}>
          {formatUserName(user?.email || "Visitante")}
        </Text>
        
        <Text style={[styles.userEmail, { color: colors.onSurfaceVariant }]}>
          {user?.email}
        </Text>
      </View>

      <BottomBar onSignOut={signOut} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 40 },
  avatarContainer: {
    width: 160,
    height: 160,
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    flexDirection: 'column',
    gap: 8,
  },
  fab: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  userEmail: {
    fontSize: 14,
    marginTop: 4,
  }
});