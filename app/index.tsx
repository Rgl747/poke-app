import { Home } from "@/src/componets/Screens/Home";
import axios from "axios";

async function fetchData() {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        console.log('Data obtained:', response.data);
    } catch (error: unknown) { 
        if (error instanceof Error) { 
            console.error('Error:', error.message);
        } else {
            console.error('Unknown error');
        }
    }
}

fetchData();

export default function Index() {
    return (
        <Home />
    );
}