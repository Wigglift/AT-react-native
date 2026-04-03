import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext'; // Importando o hook de tema

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, loadingAuth } = useAuth(); // Pegando loadingAuth se existir no seu contexto
  const router = useRouter();

  // Acessando o tema global
  const { theme } = useTheme();
  const colors = theme.colors;

  const handleRegister = () => {
    if (email && password) {
      signUp(email, password);
    } else {
      alert("Preencha todos os campos");
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.onSurface }]}>Nova Conta</Text>
          <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
            Preencha os dados para se cadastrar
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput 
            style={[
              styles.input, 
              { color: colors.onSurface, borderBottomColor: colors.outlineVariant }
            ]} 
            placeholder="E-mail" 
            placeholderTextColor={colors.onSurfaceVariant}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput 
            style={[
              styles.input, 
              { color: colors.onSurface, borderBottomColor: colors.outlineVariant }
            ]} 
            placeholder="Senha" 
            placeholderTextColor={colors.onSurfaceVariant}
            value={password}
            onChangeText={setPassword}
            secureTextEntry 
          />
          
          <TouchableOpacity 
            style={[styles.buttonPrimary, { backgroundColor: colors.primary }]} 
            onPress={handleRegister}
            disabled={loadingAuth}
          >
            {loadingAuth ? (
              <ActivityIndicator color={colors.onPrimary} />
            ) : (
              <Text style={[styles.buttonText, { color: colors.onPrimary }]}>Criar Conta</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={{ color: colors.onSurfaceVariant }}>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.push('/LoginScreen')}>
            <Text style={[styles.linkTextBold, { color: colors.primary }]}>Fazer Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
  },
  form: {
    width: '100%',
  },
  input: {
    height: 50,
    borderBottomWidth: 1.5,
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 15,
  },
  buttonPrimary: {
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  linkTextBold: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});