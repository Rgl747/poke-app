import { Axios } from "axios";

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



//esto???
// async function fetchData() {
//     try {
//         const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
//         console.log('Data obtained:', response.data);
//     } catch (error: unknown) { 
//         if (error instanceof Error) { 
//             console.error('Error:', error.message);
//         } else {
//             console.error('Unknown error');
//         }
//     }
// }