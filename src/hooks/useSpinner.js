import { useState, useCallback } from 'react'

const useSpinner = () => {

    const [loading, setLoading] = useState(false)

    const loadingHandler = useCallback(value => {
        setLoading(value)
    }, [])

    return [
        loading,
        loadingHandler
    ]
}

export default useSpinner