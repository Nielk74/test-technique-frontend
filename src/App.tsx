import { useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';
import Carousel from './components/carousel/Carousel';
import { Link } from 'react-router';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [characterId, setCharacterId] = useState(1);

  return (
    <ApolloProvider client={client}>
        Character ID: {characterId}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2>Characters</h2>
          <Carousel setCharacterId={setCharacterId} />
          <Link to="/characters/list">{`View more >`}</Link>
        </div>
    </ApolloProvider>
  )
}

export default App
