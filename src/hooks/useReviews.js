import axios from "axios";
import { useEffect, useState } from "react";

const useReviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        axios.get('https://dashboard.heroku.com/apps/mighty-taiga-34747/reviews')
            .then(res => setReviews(res.data))
    }, []);

    return [reviews];
};

export default useReviews;