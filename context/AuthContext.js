import React, { createContext, useState, useContext, useEffect } from 'react';
import Auth from '../services/Auth';
import { useRouter } from 'expo-router';
import { supabase } from '../services/Supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const router = useRouter();

useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    setLoadingAuth(false);

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    const {data, error} = await Auth.signIn(email, password);
    if (error) {  
      alert(`Erro ao fazer login: ${error.message}`);
      return;
    } else {
      setUser(data.user);
    }
    router.replace("/")
  };

  const signUp = async (email, password) => {
    const {data, error} = await Auth.signUp(email, password);
    if (error) {
      alert(`Erro ao criar conta: ${error.message}`);
      return;
    } else {
      setUser(data.user);
    }
    router.replace("/LoginScreen")
  };

  const signOut = async () => {
    await Auth.signOut();
    setUser(null);
    router.replace("/LoginScreen")
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signUp, signOut, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);