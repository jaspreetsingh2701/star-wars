import { BASE_URL } from "../utils/constants";

export const fetchAllPlanetsRequest = (url: string, planets: any, resolve: any, reject: any) => {
    return fetch(url).then(results => {
        const jsonRes = results.json();
        jsonRes.then((planetsResponse: any) => {
            const retrievedPlanets = [...planets, ...planetsResponse.results];
            if (planetsResponse.next !== null) {
                fetchAllPlanetsRequest(planetsResponse.next, retrievedPlanets, resolve, reject)
            }
            else {
                resolve(retrievedPlanets);
            }
        });
    });
}

export const fetchPlanetsRequest = (url: string, planets: any, resolve: any, reject: any) => {
    return fetch(url).then(results => {
        const jsonRes = results.json();
        jsonRes.then((planetsResponse: any) => {
            const retrievedPlanets = [...planets, ...planetsResponse.results];
            resolve(retrievedPlanets);
        });
    });
}

export const searchPlanet = (searchTerm: any) => {
    let searchParam = `?search=${searchTerm}`;
    return fetch(`${BASE_URL}planets${searchParam}&format=json`).then(result => {
        return result.json()
    });
}