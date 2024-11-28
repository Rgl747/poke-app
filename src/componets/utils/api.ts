import axios from "axios";


export interface Pokemon{
    name: string;
    order: number;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            }
        }
    }
    types: {
        slots: number;
        type: {
            name: string;
        }
    }
}


export async function fetchData(url: string = 'https://pokeapi.co/api/v2/pokemon/') {
    try {
        const response = await axios.get(url);
        return response.data; // Devolvemos los datos de la respuesta
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Unknown error');
        }
        return null; // Aseguramos que se devuelvan `null` en caso de error
    }
}