import { Character } from '../../types/commonTypes';
import { styles } from './styled';

interface CarouselItemProps {
    character: Character;
    isSelected: boolean;
    onSelect: () => void;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ character, isSelected, onSelect }) => (
    <div
        className="carousel-item"
        data-character-id={character.id}
        style={styles.carouselItem(isSelected) as React.CSSProperties}
        onClick={onSelect}
    >
        <p style={styles.characterName}>{character.name}</p>
        <img
            src={character.image}
            alt={character.name}
            style={styles.characterImage}
        />
    </div>
);

export default CarouselItem;