import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, timeout = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), timeout)

    return () => {
      clearTimeout(timer)
    }
  }, [value, timeout])

  return debouncedValue
}
