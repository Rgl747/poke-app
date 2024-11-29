import { ActivityIndicator  } from "react-native";
import { useEffect, useState } from "react";
import { PokemonCard } from "../componets/PokemonCard";
import { fetchData } from "../utils/api";
import { FlatList } from "native-base";

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
            numColumns={2}
            contentInsetAdjustmentBehavior='automatic'
            ListFooterComponent={() => isLoadingMore ? <ActivityIndicator size="large" /> : null} 
            contentContainerStyle={{padding: 2, backgroundColor: 'white'}}
        />
    );
}

