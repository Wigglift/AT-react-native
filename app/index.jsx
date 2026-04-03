import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthContext'; // Seu hook de autenticação
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const { user, isLoading } = useAuth();

  // Importante: Enquanto o estado do usuário está carregando (ex: lendo do AsyncStorage)
  // você deve mostrar um loading, senão ele redirecionará para o login antes da hora.
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/LoginScreen" />;
  }

  return <Redirect href="/Home" />;
}