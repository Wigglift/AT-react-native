import { supabase } from "./Supabase";

const Auth = {
    signIn: (email,password) => {
        return supabase.auth.signInWithPassword({ email, password })
    },
    signOut: () => {
        return supabase.auth.signOut(); 
    },
    signUp: (email,password) => {
        return supabase.auth.signUp({ email, password })
    },
}

export default Auth;