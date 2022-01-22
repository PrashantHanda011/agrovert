import { useState, useEffect } from 'react'

const useIntersection = (element, rootMargin) => {
    const [isVisible, setState] = useState(false);
    const current = element.current
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setState(entry.isIntersecting);
            }, { rootMargin }
        );

        element.current && observer.observe(element.current);

        return () => current ?observer.unobserve(current): ()=>{};
    }, []);

    return isVisible;
};

export default useIntersection