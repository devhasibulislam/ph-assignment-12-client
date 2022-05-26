import { useEffect, useState } from "react"

const useToken = user => {
    const [token, setToken] = useState('');
    useEffect(() => {
        console.log(user);
        const email = user?.user?.email;
        const name = user?.user?.displayName;
        const avatar = user?.user?.photoURL;
        const currentUser = {
            email: email,
            name: name,
            avatar: avatar
        };
        if (email) {
            fetch(`https://dashboard.heroku.com/apps/mighty-taiga-34747/userAdd/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    console.log('data inside useToken', data);
                    const accessToken = data.token;
                    localStorage.setItem('accessToken', accessToken);
                    setToken(accessToken);
                })
        }

    }, [user]);

    return [token];
}

export default useToken;