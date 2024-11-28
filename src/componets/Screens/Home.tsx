import { StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { PokemonCard } from "../PokemonCard";
import { fetchData } from "../utils/api";

interface Pokemon {
    name: string;
    url: string;
}

export function Home() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]); 
    const [next, setNext] = useState<string | null>(null); 
    const [isLoadingMore, setIsLoadingMore] = useState(false); 


    useEffect(() => {
        fetchData().then((data) => {
            if (data) {
                setPokemon(data.results); 
                setNext(data.next); 
            }
        });
    }, []);

    // Función para cargar más Pokémon
    const loadMore = async () => {
        if (!next || isLoadingMore) return; // Si no hay más datos o ya está cargando, salimos

        setIsLoadingMore(true); // Indicamos que estamos cargando más
        const data = await fetchData(next);
        if (data){
            setPokemon((prev) => [...prev, ...data.results]);
            setNext(data.next);
        }
        setIsLoadingMore(false);
    };

    return (
        <FlatList
            data={pokemon} // Usamos `FlatList` para mostrar los Pokémon
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => <PokemonCard url={item.url} />}
            onEndReached={loadMore} // Llamamos a `loadMore` cuando lleguemos al final de la lista
            ListFooterComponent={() => isLoadingMore ? <ActivityIndicator size="large" /> : null} // Mostramos el indicador de carga si estamos cargando más
        />
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
});
