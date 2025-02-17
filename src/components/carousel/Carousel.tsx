import { useState, useEffect, useRef } from "react";
import { Character } from "../../types/commonTypes";
import { styles } from "./styled";
import { useCharacters } from "../../hooks/useCharacter";
import { useCarouselDrag } from "../../hooks/useCarouselDrag";

import CarouselItem from "./CarouselItem";

const Carousel = () => {
    const [page, setPage] = useState(1);
    const [centeredCharacterId, setCenteredCharacterId] = useState<string>("1");
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const { info, characters: newCharacters, loading, error } = useCharacters(page);
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        if (newCharacters?.length) {
            setCharacters((prev) => [...prev, ...newCharacters]);
        }
    }, [newCharacters]);

    const updateCenteredCharacter = () => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const containerCenter = container.offsetLeft + (container.clientWidth / 2);
        const items = container.getElementsByClassName('carousel-item');
        
        let closestItem = null;
        let minDistance = Infinity;

        Array.from(items).forEach((item) => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.left + (rect.width / 2);
            const distance = Math.abs(itemCenter - containerCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestItem = item;
            }
        });

        if (closestItem) {
            const id = (closestItem as HTMLElement).getAttribute('data-character-id');
            if (id && id !== centeredCharacterId) {
                setCenteredCharacterId(id);
            }
        }
    };

    const { containerRef, handleDragStart, handleDragEnd, handleDrag, scrollToItem} = useCarouselDrag(updateCenteredCharacter);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => updateCenteredCharacter();
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [centeredCharacterId]);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && info?.next && !loading) {
                        const nextPage = info.next;
                        setPage(nextPage);
                    }
                });
            },
            { root: null, rootMargin: "100px", threshold: 0.1 }
        );

        observer.observe(sentinel);
        return () => sentinel && observer.unobserve(sentinel);
    }, [loading]);


    if (error) return <p>Error: {error.message}</p>;

    return (
        <div
            ref={containerRef}
            className="carousel-container"
            onMouseDown={handleDragStart} onMouseUp={handleDragEnd} onMouseMove={handleDrag}
            style={styles.container}

        >
            <style>{`.carousel-container::-webkit-scrollbar { display: none; }`}</style>
            {characters.map((character) => (
                <CarouselItem
                key={character.id}
                character={character}
                isSelected={centeredCharacterId === character.id}
                onSelect={() => {
                    setCenteredCharacterId(character.id);
                    scrollToItem(character.id);
                }}
            />
            ))}
            <div ref={sentinelRef} style={{ width: "1px", height: "100%" }} />
        </div>
    );
};

export default Carousel;
