import axios from "axios";

const rhodosClient = axios.create({
    baseURL: "https://api.rhodesapi.com/api/operator",
    headers: {
        'Content-Type': 'application/json',
    },
});

const penguinClient = axios.create({
    baseURL: "https://penguin-stats.io/PenguinStats/api/v2",
    headers: {
        'Content-Type': 'application/json',
    },
})

export { rhodosClient, penguinClient };