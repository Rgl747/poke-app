import { ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { PokemonCard } from "../componets/PokemonCard";
import { fetchData } from "../utils/api";
import { FlatList, Icon, Fab, Box } from "native-base";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import type { MainStackParamList } from "../navigators/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<MainStackParamList, "Home">;

interface Pokemon {
    name: string;
    url: string;
}

export function Home() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [next, setNext] = useState<string | null>(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const navigation = useNavigation<NavigationProp>(); // Navegación tipada

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
        if (data) {
            setPokemon((prev) => [...prev, ...data.results]);
            setNext(data.next);
        }
        setIsLoadingMore(false);
    };

    return (
        <Box flex={1} bg="white">
            <FlatList
                data={pokemon}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => <PokemonCard url={item.url} />}
                onEndReached={loadMore}
                numColumns={2}
                contentInsetAdjustmentBehavior="automatic"
                ListFooterComponent={() =>
                    isLoadingMore ? <ActivityIndicator size="large" /> : null
                }
                contentContainerStyle={{ padding: 2 }}
            />

            {/* Botón flotante circular */}
            <Fab
                renderInPortal={false}
                shadow={2}
                size="sm"
                icon={
                    <Icon
                        as={AntDesign}
                        name="staro"
                        size="lg"
                        color="white"
                    />
                }
                bg="yellow.500"
                onPress={() => navigation.navigate("Favorite")} // Navegación a la pantalla "Favorite"
                position="absolute"
                bottom={4}
                right={4}
            />
        </Box>
    );
}
