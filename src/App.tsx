import { useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';
import Carousel from './carousel/Carousel';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql', // Replace with your API URL
  cache: new InMemoryCache(),
});

function App() {
  const [characterId, setCharacterId] = useState(1);

  return (
    <ApolloProvider client={client}>
        Character ID: {characterId}
        {/* <Character characterId={characterId} /> */}
        <Carousel setCharacterId={setCharacterId} />
    </ApolloProvider>
  )
}

export default App
