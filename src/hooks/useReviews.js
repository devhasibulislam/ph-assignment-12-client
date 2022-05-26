import axios from "axios";
import { useEffect, useState } from "react";

const useReviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        axios.get('https://mighty-taiga-34747.herokuapp.com/reviews')
            .then(res => setReviews(res.data))
    }, []);

    return [reviews];
};

export default useReviews;