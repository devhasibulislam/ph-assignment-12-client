import axios from "axios";
import { useEffect, useState } from "react";

const useHammerPhotos = () => {
    const [hammerPhotos, setHammerPhotos] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/hammerPhotos')
            .then(res => setHammerPhotos(res?.data))
    }, []);

    return [hammerPhotos];
};

export default useHammerPhotos;