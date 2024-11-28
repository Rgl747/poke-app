import { StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { PokemonCard } from "../componets/PokemonCard";
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

    
    const loadMore = async () => {
        if (!next || isLoadingMore) return; 

        setIsLoadingMore(true); 
        const data = await fetchData(next);
        if (data){
            setPokemon((prev) => [...prev, ...data.results]);
            setNext(data.next);
        }
        setIsLoadingMore(false);
    };

    return (
        <FlatList
            data={pokemon} 
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => <PokemonCard url={item.url} />}
            onEndReached={loadMore} 
            ListFooterComponent={() => isLoadingMore ? <ActivityIndicator size="large" /> : null} 
        />
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
});
