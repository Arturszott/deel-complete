import { SearchItemType } from "./types";

const BASE_API_URL = 'http://localhost:3000' // TODO: get from env

export async function search(phrase: string) {
    const response = await fetch(`${BASE_API_URL}/search?phrase=${phrase}`);

    if(!response.ok) {
        throw new Error('Search call failed for some reason')
    }

    const data: SearchItemType[] = await response.json();

    return data;
}