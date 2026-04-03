import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeContext'; 
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomBar from '../components/BottomBar';

const SettingsScreen = () => {
  const { themeMode, changeTheme, theme } = useTheme();
    const router = useRouter();
  // Mapeamento das opções
  const options = [
    { label: 'Claro', value: 'light', icon: 'light-mode' },
    { label: 'Escuro', value: 'dark', icon: 'dark-mode' },
    { label: 'Padrão do Sistema', value: 'system', icon: 'settings-brightness' },
  ];

  const colors = theme.colors;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.onSurface }]}>Configurações</Text>
        
        <Text style={[styles.sectionTitle, { color: colors.onSurface, opacity: 0.6 }]}>
          APARÊNCIA
        </Text>

        {/* Usei 'surfaceVariant' para o fundo do grupo, que é o padrão do MD3 para cards/containers */}
        <View style={[styles.group, { backgroundColor: colors.surfaceVariant }]}>
          {options.map((option, index) => {
            const isSelected = themeMode === option.value;
            
            return (
                <View>
                    <TouchableOpacity
                        key={option.value}
                        activeOpacity={0.7}
                        style={[
                        styles.option,
                        index < options.length - 1 && { 
                            borderBottomWidth: 1, 
                            borderBottomColor: colors.outlineVariant // Cor de borda do Paper
                        }
                        ]}
                        onPress={() => changeTheme(option.value)}
                    >
                        <View style={styles.optionLeft}>
                        <MaterialIcons name={option.icon} size={22} color={colors.onSurfaceVariant} />
                        <Text style={[styles.optionLabel, { color: colors.onSurfaceVariant }]}>
                            {option.label}
                        </Text>
                        </View>
                        
                        {/* Indicador de Seleção */}
                        <View style={[styles.radio, { borderColor: colors.primary }]}>
                        {isSelected && (
                            <View style={[styles.radioInner, { backgroundColor: colors.primary }]} />
                        )}
                        </View>
                    </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    <BottomBar />
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({

  container: { flex: 1 },
  content: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  sectionTitle: { fontSize: 13, fontWeight: '600', marginBottom: 10, marginLeft: 5, letterSpacing: 1 },
  group: { borderRadius: 12, overflow: 'hidden' },
  option: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18 },
  optionLeft: { flexDirection: 'row', alignItems: 'center' },
  optionLabel: { fontSize: 16, marginLeft: 12 },
  radio: { height: 22, width: 22, borderRadius: 11, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  radioInner: { height: 12, width: 12, borderRadius: 6 },
});