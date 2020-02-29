import { BASE_URL } from "../utils/constants";

export const validateUserAndLogin = (username: string, password: string) => {
    return fetch(`${BASE_URL}people/?search=${username}`).then(result => {
        return result.json()
    });
}