import { useState, useEffect } from 'react'
import axios from 'axios';

const SuggestAPI = () => {

    const [suggest, setSuggest] = useState({});
    const [callback, setCallback] = useState(false);

    useEffect(() => {
        const getSuggest = async () => {
            const res = await axios.get("/api/getsuggestbook")
            setSuggest(res.data[0]);
        }
        getSuggest()
    }, [setSuggest, callback])



    return {
        suggest: [suggest, setSuggest],
        callback: [callback, setCallback]
    }
}

export default SuggestAPI
