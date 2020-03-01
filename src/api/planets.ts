import { BASE_URL } from "../utils/constants";
import { IPlanets } from "../pages/dashboard/types";

export const fetchAllPlanetsRequest = (url: string, planets: any, resolve: any, reject: any) => {
    return fetch(url).then(results => {
        const jsonRes = results.json();
        jsonRes.then((planetsResponse: IPlanets) => {
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
        jsonRes.then((planetsResponse: IPlanets) => {
            const retrievedPlanets = [...planets, ...planetsResponse.results];
            resolve(retrievedPlanets);
        });
    });
}

export const searchPlanet = (searchTerm: string) => {
    let searchParam = `?search=${searchTerm}`;
    return fetch(`${BASE_URL}planets${searchParam}&format=json`).then(result => {
        return result.json()
    });
}