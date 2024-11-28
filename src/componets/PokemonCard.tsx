import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import { useNavigation } from "@react-navigation/native";
import { MainStackScreenProps } from "../navigators/types";

interface PokemonCardProps {
    url: string;
}

interface Pokemon {
    name: string;
    order: number;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            }
        }
    };
    types: {
        slots: number;
        type: {
            name: string;
        };
    };
}

export function PokemonCard({ url }: PokemonCardProps) {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    const navigation = useNavigation<MainStackScreenProps<'Home'>['navigation']>();

    useEffect(() => {
        fetchData(url).then((data) => {
            if (data) {
                setPokemon(data);
            }
        });
    }, [url]);

    if (!pokemon) return null;

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('Detail', { name: pokemon.name })}>
            <Image
                source={{
                    uri: pokemon.sprites.other['official-artwork'].front_default,
                }}
                style={styles.image}
            />
            <Text style={styles.name}>{pokemon.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 32,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 32,
    },
});
