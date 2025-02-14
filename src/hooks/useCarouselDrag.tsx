import { useRef, useState } from 'react';

export const useCarouselDrag = (onDragEnd: () => void) => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const mouseCoords = useRef({ startX: 0, scrollLeft: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleDragStart = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const startX = e.pageX - containerRef.current.offsetLeft;
        const scrollLeft = containerRef.current.scrollLeft;
        mouseCoords.current = { startX, scrollLeft };
        setIsMouseDown(true);
        document.body.style.cursor = "grabbing";
    };

    const handleDragEnd = () => {
        setIsMouseDown(false);
        if (!containerRef.current) return;
        document.body.style.cursor = "default";
        onDragEnd();
    };

    const handleDrag = (e: React.MouseEvent) => {
        if (!isMouseDown || !containerRef.current) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walkX = (x - mouseCoords.current.startX) * 1.5;
        containerRef.current.scrollLeft = mouseCoords.current.scrollLeft - walkX;
    };
    const scrollToItem = (characterId: string) => {
        if (!containerRef.current) return;
        
        const item = containerRef.current.querySelector(
            `[data-character-id="${characterId}"]`
        );
        
        if (item && containerRef.current) {
            const container = containerRef.current;
            const itemRect = item.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const scrollLeft = container.scrollLeft + 
                itemRect.left - 
                containerRect.left - 
                (containerRect.width - itemRect.width) / 2;
            
            container.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    };
    return {
        containerRef,
        handleDragStart,
        handleDragEnd,
        handleDrag,
        scrollToItem
    };
};