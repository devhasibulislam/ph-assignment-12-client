import axios from "axios";
import { useEffect, useState } from "react";

const useHammerPhotos = () => {
    const [hammerPhotos, setHammerPhotos] = useState([]);
    useEffect(() => {
        axios.get('https://dashboard.heroku.com/apps/mighty-taiga-34747/hammerPhotos')
            .then(res => setHammerPhotos(res?.data))
    }, []);

    return [hammerPhotos];
};

export default useHammerPhotos;