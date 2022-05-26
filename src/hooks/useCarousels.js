import axios from "axios";
import { useEffect, useState } from "react";

const useCarousels = () => {
    const [carousels, setCarousels] = useState([]);
    useEffect(() => {
        axios.get('https://mighty-taiga-34747.herokuapp.com/carousels')
            .then(res => setCarousels(res?.data))
    }, []);

    return [carousels];
};

export default useCarousels;