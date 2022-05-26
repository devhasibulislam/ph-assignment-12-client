import axios from "axios";
import { useEffect, useState } from "react";

const useCarousels = () => {
    const [carousels, setCarousels] = useState([]);
    useEffect(() => {
        axios.get('https://dashboard.heroku.com/apps/mighty-taiga-34747/carousels')
            .then(res => setCarousels(res?.data))
    }, []);

    return [carousels];
};

export default useCarousels;