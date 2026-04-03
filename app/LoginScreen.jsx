import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loadingAuth, user } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    if (email && password) {
      signIn(email, password);
    } else {
      alert("Preencha todos os campos");
    }
  };

  useEffect(() => {
    if(user) {
      router.replace("/");
    }
    }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Acesse sua conta para continuar</Text>
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
            style={styles.buttonPrimary} 
            onPress={handleLogin}
          >
              <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text>Não possui conta? </Text>
          <TouchableOpacity onPress={() => router.push('/RegisterScreen')}>
            <Text style={styles.linkTextBold}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

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