import { useState } from 'react';

import Carousel from './components/carousel/Carousel';
import { Link } from 'react-router';
import { styles } from './components/navigation/styled';

function App() {
  const [, setCharacterId] = useState(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24}}>
      <img src="./portal.png" alt="Rick and Morty" style={{ height: '30vh', paddingTop: '50px'}} />
      <Carousel setCharacterId={setCharacterId} />
      <Link to="/characters/list" style={styles.link}>{`View more`}</Link>
    </div>
  )
}

export default App
