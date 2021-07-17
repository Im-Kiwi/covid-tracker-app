import { useState, useCallback } from 'react'

const useError = () => {

    const [isError, setIsError] = useState(false)

    const errorHandler = useCallback((value) => {
        setIsError(value)
    }, [])

    return [
        isError,
        errorHandler
    ]
}

export default useError