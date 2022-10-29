import axios from "axios";
import { useEffect, useState } from "react";

const useHammerPhotos = () => {
    const [hammerPhotos, setHammerPhotos] = useState([]);
    useEffect(() => {
        axios.get('https://manufacturer-website-mw-server.onrender.com/hammerPhotos')
            .then(res => setHammerPhotos(res?.data))
    }, []);

    return [hammerPhotos];
};

export default useHammerPhotos;