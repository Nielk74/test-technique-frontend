import { Link } from "react-router";
import { useParams } from 'react-router-dom';
import { useCharacterDetails } from '../hooks/useCharacter';
import { styles } from '../components/navigation/styled';

const CharacterDetails = () => {
    const { characterId } = useParams();
    const { character, loading} = useCharacterDetails(parseInt(characterId || '0'));
    return (
        <div style={{margin: '20px'}}>
            <div style={{ marginBottom: '20px' }}>
                <Link to="/" style={styles.link}>Home</Link>
                <Link to="/characters/list" style={styles.link}>Characters</Link>
            </div>
            { !loading && !character && <p>Character not found</p>}
            {loading ? <p>Loading...</p> : (
                <div>
                    <h1>{character?.name}</h1>
                    <img src={character?.image} alt={character?.name} style={{ width: 200, height: 200, borderRadius: '50%' }} />
                    <p>Status: {character?.status}</p>
                    <p>Species: {character?.species}</p>
                    <p>Type: {character?.type || 'Unkown'}</p>
                    <p>Last known location: {character?.location.name}</p>
                    <p>Origin: {character?.origin.name}</p>
                </div>
            )}
        </div>
    );
}


export default CharacterDetails;