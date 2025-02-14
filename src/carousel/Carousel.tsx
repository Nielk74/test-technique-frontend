import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { Character, CarouselProps } from "./types";
import { styles } from "./styles";
import { GET_CHARACTERS } from "./queries";
import { useCarouselDrag } from "../hooks/useCarouselDrag";

import CarouselItem from "./CarouselItem";

const Carousel: React.FC<CarouselProps> = ({ setCharacterId }) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [page, setPage] = useState(1);
    const [centeredCharacterId, setCenteredCharacterId] = useState<string>("1");
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
        variables: { page },
        notifyOnNetworkStatusChange: true,
    });

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
                setCharacterId(parseInt(id, 10));
            }
        }
    };

    const { containerRef, handleDragStart, handleDragEnd, handleDrag, scrollToItem} = useCarouselDrag(updateCenteredCharacter);

    useEffect(() => {
        if (data?.characters?.results) {
            setCharacters((prev) => [...prev, ...data.characters.results]);
        }
    }, [data]);

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
                    if (entry.isIntersecting && data?.characters?.info?.next && !loading) {
                        const nextPage = data.characters.info.next;
                        fetchMore({ variables: { page: nextPage } });
                        setPage(nextPage);
                    }
                });
            },
            { root: null, rootMargin: "100px", threshold: 0.1 }
        );

        observer.observe(sentinel);
        return () => sentinel && observer.unobserve(sentinel);
    }, [data, fetchMore, loading]);


    if (error) return <p>Error: {error.message}</p>;

    return (
        <div
            ref={containerRef}
            className="carousel-container"
            onMouseDown={handleDragStart} onMouseUp={handleDragEnd} onMouseMove={handleDrag}
            style={styles.container}

        >
            <style>{`.carousel-container::-webkit-scrollbar { display: none; }`}</style>
            <div style={styles.spacer} />
            {characters.map((character) => (
                <CarouselItem
                key={character.id}
                character={character}
                isSelected={centeredCharacterId === character.id}
                onSelect={() => {
                    setCharacterId(parseInt(character.id, 10));
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
