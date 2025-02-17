import { createRoot } from 'react-dom/client'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import CharactersList from './pages/CharactersList.tsx'
import CharacterDetails from './pages/CharacterDetails.tsx';


const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <BrowserRouter basename={import.meta.env.BASE_URL || ''}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/characters/list" element={<CharactersList />} />
        <Route path="/characters/:characterId" element={<CharacterDetails />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
)
