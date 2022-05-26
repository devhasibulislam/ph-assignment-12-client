import axios from "axios";
import { useEffect, useState } from "react";

const useHammerPhotos = () => {
    const [hammerPhotos, setHammerPhotos] = useState([]);
    useEffect(() => {
        axios.get('https://mighty-taiga-34747.herokuapp.com/hammerPhotos')
            .then(res => setHammerPhotos(res?.data))
    }, []);

    return [hammerPhotos];
};

export default useHammerPhotos;