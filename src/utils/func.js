import { useEffect, useRef } from 'react';

export const useClickOutside = (handlor) => {
    const domNode = useRef();
    useEffect(() => {
        const mayBeHandlor = (event) => {
            event.stopPropagation();
            // if (!!domNode.current && !domNode.current.contains(event.target)) {
            if (!!domNode.current && !domNode.current.contains(event.target)) {
                handlor();
            }
        }
        document.addEventListener('mousedown', mayBeHandlor)
        return () => document.removeEventListener('mousedown', mayBeHandlor);
    })

    return domNode;
}
