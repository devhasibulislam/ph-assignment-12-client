import axios from "axios";
import { useEffect, useState } from "react";

const useCarousels = () => {
    const [carousels, setCarousels] = useState([]);
    useEffect(() => {
        axios.get('https://manufacturer-website-mw-server.onrender.com/carousels')
            .then(res => setCarousels(res?.data))
    }, []);

    return [carousels];
};

export default useCarousels;