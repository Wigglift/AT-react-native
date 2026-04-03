import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useAuth();
  const router = useRouter();

  const handleRegister = () => {
    if (email && password) {
      signUp(email, password);
    } else {
      alert("Preencha todos os campos");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Nova Conta</Text>
          <Text style={styles.subtitle}>Preencha os dados para se cadastrar</Text>
        </View>

        <View style={styles.form}>
          <TextInput 
            style={styles.input} 
            placeholder="E-mail" 
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Senha" 
            value={password}
            onChangeText={setPassword}
            secureTextEntry 
          />
          
          <TouchableOpacity 
            style={[styles.buttonPrimary, { backgroundColor: '#34C759' }]} 
            onPress={handleRegister}
          >
              <Text style={styles.buttonText}>Criar Conta</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.push('/LoginScreen')}>
            <Text style={styles.linkTextBold}>Fazer Login</Text>
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
    backgroundColor: '#FFF',
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
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 5,
  },
  form: {
    width: '100%',
  },
  input: {
    height: 50,
    borderBottomWidth: 1.5,
    borderBottomColor: '#E5E5EA',
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 15,
  },
  buttonPrimary: {
    height: 55,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  linkTextBold: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});