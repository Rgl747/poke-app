import { Text, View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { PokemonCard } from "../PokemonCard";

interface Pokemon {
    name: string;
    url: string;
}

export function Home() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]); // Estado para los Pokémon
    const [next, setNext] = useState<string | null>(null); // Estado para la siguiente URL (paginación)
    const [isLoadingMore, setIsLoadingMore] = useState(false); // Estado para saber si estamos cargando más datos

    // Usamos `useEffect` para cargar los Pokémon cuando se monta el componente
    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/') // URL inicial de la API
            .then((res) => res.json())
            .then((data) => {
                setPokemon(data.results); // Guardamos los resultados de la API
                setNext(data.next); // Guardamos la URL de la siguiente página de resultados
            });
    }, []);

    // Función para cargar más Pokémon
    const loadMore = () => {
        if (isLoadingMore || !next) return; // No hacer nada si ya estamos cargando o no hay más resultados

        setIsLoadingMore(true); // Indicamos que estamos cargando más
        fetch(next) // Hacemos la solicitud para obtener la siguiente página
            .then((res) => res.json())
            .then((data) => {
                setPokemon((prevPokemon) => [...prevPokemon, ...data.results]); // Añadimos los nuevos Pokémon al estado
                setNext(data.next); // Actualizamos la URL de la siguiente página
                setIsLoadingMore(false); // Terminamos de cargar
            });
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
