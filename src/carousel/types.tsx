export interface Character {
    id: string;
    name: string;
    image: string;
}

export interface CarouselProps {
    setCharacterId: React.Dispatch<React.SetStateAction<number>>;
}