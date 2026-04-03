# 🎬 MovieApp - Projeto React Native

Projeto desenvolvido para a disciplina de Desenvolvimento Mobile. O aplicativo consiste em uma plataforma de consulta de filmes com suporte a temas, autenticação, persistência local de favoritos e perfil de usuário.

---

## 🚀 Funcionalidades Principais

* **Autenticação Completa:** Sistema de Login e Registro integrado via Context API do [Supabase](https://supabase.com/).
* **Consumo de API:** Listagem de filmes em tempo real usando a API do [TMDB](https://www.themoviedb.org/?language=pt-BR) com busca e paginação (Infinite Scroll).
* **Temas Dinâmicos:** Suporte total a Modo Claro (Light) e Modo Escuro (Dark) utilizando React Native Paper e Context API.
* **Favoritos Offline:** Persistência de dados local utilizando SQLite para salvar filmes favoritos mesmo sem conexão com a internet.
* **Perfil do Usuário:** Gestão de avatar com integração de Câmera e Galeria através do expo-image-picker.
* **Navegação Customizada:** Bottom Bar fixa e responsiva para alternância entre telas.

---

## 🛠️ Tecnologias Utilizadas

* **Framework:** React Native (Expo)
* **Estilização & Componentes:** React Native Paper (Material Design 3)
* **Navegação:** Expo Router
* **Banco de Dados Local:** Expo SQLite
* **Ícones:** @expo/vector-icons (MaterialIcons e FontAwesome)
* **Multimídia:** expo-image-picker
* **Armazenamento Simples:** AsyncStorage (para salvar a preferência de tema)

---

## 📂 Estrutura de Pastas

```
├── app/                # Rotas e Telas (Movies, Login, Register, Profile, Favorites)
├── components/         # Componentes reutilizáveis (BottomBar, MovieItem)
├── context/            # Provedores de contexto (AuthContext, ThemeContext)
├── hooks/              # Hooks customizados (useMovie, useImage)
├── services/           # Configuração de API e Banco de Dados (database.js, Themes.js)
└── utils/              # Funções auxiliares (imageHelper.js)
```

---

## 🔧 Como Executar

1. Clone o repositório:

```
git clone <url-do-repositorio>
```

2. Instale as dependências:

```
npm install
```

3. Insira as informações no env:

```
├── .env
```

4. Inicie o projeto:

```
npx expo start
```

5. Escaneie o QR Code com o app **Expo Go** no seu celular.
