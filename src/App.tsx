import { useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';
import Carousel from './components/carousel/Carousel';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [characterId, setCharacterId] = useState(1);

  return (
    <ApolloProvider client={client}>
        Character ID: {characterId}
        <Carousel setCharacterId={setCharacterId} />
    </ApolloProvider>
  )
}

export default App
