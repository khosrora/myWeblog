import { useState } from 'react'

const GlobalData = () => {

    const [loading, setLoading] = useState(false)


    return {
        loading: [loading, setLoading]
    }
}

export default GlobalData
