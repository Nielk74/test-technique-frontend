import { useState } from 'react';

import Carousel from './components/carousel/Carousel';
import { Link } from 'react-router';


function App() {
  const [, setCharacterId] = useState(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Characters</h2>
      <Carousel setCharacterId={setCharacterId} />
      <Link to="/characters/list">{`View more >`}</Link>
    </div>
  )
}

export default App
