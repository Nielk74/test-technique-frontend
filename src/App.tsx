import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql', // Replace with your API URL
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>	
        <h2>Rick and Morty Characters</h2>
    </ApolloProvider>
  )
}

export default App
