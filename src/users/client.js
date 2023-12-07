import axios from "axios";
const USERS_API = "http://localhost:4000/api/users"

export const findAllUsers = async () => {
    const response = await axios.get(USERS_API);
    return response.data;
}

// export const findUsersById
