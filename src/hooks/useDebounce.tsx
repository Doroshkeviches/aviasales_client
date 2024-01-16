import { useCallback, useRef } from 'react'

export default function useDebounce(callback: any, delay: number = 500) {
    const timer = useRef<NodeJS.Timeout>()
    const debouncedCallback = useCallback((...args: string[]) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay])
    return debouncedCallback
}
