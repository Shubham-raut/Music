import { useEffect, useRef } from 'react';

export const useClickOutsideInside = (handlor) => {
    const domNode = useRef();
    useEffect(() => {
        const mayBeHandlor = (event) => {
            event.stopPropagation();
            if (!domNode.current?.contains(event.target) || [...domNode.current?.children].some(element => element.contains(event.target))) {
                handlor();
            }
        }
        document.addEventListener('mousedown', mayBeHandlor)
        return () => document.removeEventListener('mousedown', mayBeHandlor);
    })

    return domNode;
}


export const useClickOutside = (handlor) => {
    const domNode = useRef();
    useEffect(() => {
        const mayBeHandlor = (event) => {
            event.stopPropagation();
            if (!domNode.current?.contains(event.target)) {
                handlor();
            }
        }
        document.addEventListener('mousedown', mayBeHandlor)
        return () => document.removeEventListener('mousedown', mayBeHandlor);
    })

    return domNode;
}