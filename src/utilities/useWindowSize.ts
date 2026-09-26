import { useState, useEffect } from 'react';

export default function useWindowSize() {
    // Initialize state with undefined so server and client renders match
    // (Crucial for frameworks like Next.js)
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    useEffect(() => {
        // 1. Define the event handler
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // 2. Add the event listener on mount
        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // 3. Clean up the listener on unmount to prevent memory leaks
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect only runs on mount and unmount

    return windowSize;
}