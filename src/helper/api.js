import axios from "axios";

const get = async ({ urlObj }) => {
    try {
        const response = await axios.get(urlObj.url);
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const post = async ({ urlObj, req }) => {
    axios.post(urlObj.url, req.body)
        .then((response) => {
            return res=>res.json();
        }, (error) => {
            console.log(error);
            throw error;
        });
};

export { get, post };

// Later - We can have proper logging in b/g instead of console.log if required
