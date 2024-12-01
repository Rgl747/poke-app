import { MainStackScreenProps } from "../navigators/types";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import { AspectRatio, Image, Heading, Stack, HStack, Center, Text, Skeleton, Icon, Pressable, Toast } from "native-base";
import { getTypeColor, formatNumber } from "../utils/Helper";
import { removeEscapeCharacters } from "../utils/Helper"; 
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from "axios";

interface Pokemon {
    name: string;
    id: number;
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
    types: {
        slot: number;
        type: {
            name: string;
        };
    }[];
    species: {
        url: string; 
    };
    abilities: {
        ability: {
            name: string;
        };
    }[];
}

interface Species {
    flavor_text_entries: {
        flavor_text: string;
    }[];
}

export function Detail({ route }: MainStackScreenProps<"Detail">) {
    const { name } = route.params;
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [species, setSpecies] = useState<Species | null>(null);
    const [isSpeciesLoading, setIsSpeciesLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                // Cargar los datos del Pokémon
                const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
                const data = await fetchData(pokemonUrl);
                if (data) {
                    setPokemon(data);

                    if (data?.species?.url) {
                        const speciesData = await fetchData(data.species.url);
                        setSpecies(speciesData);
                    }
                    setIsSpeciesLoading(false);
                }
            } catch (error) {
                console.error("Error fetching Pokemon data:", error);
                Toast.show({
                    description: "Failed to load Pokémon data. Please try again later.",
                    placement: "top",
                });
            }
        };

        const checkFavoriteStatus = async () => {
            // Verificar si el Pokémon ya está en los favoritos
            if (!name) return;
            const url = `http://192.168.1.67:8000/api/favorites/`; // URL para obtener los favoritos
            try {
                const response = await axios.get(url);
                const favoritePokemons = response.data;
                const isInFavorites = favoritePokemons.some((fav: { name: string }) => fav.name === name);
                setIsFavorite(isInFavorites);
            } catch (error) {
                console.error("Error checking favorite status:", error);
            }
        };

        fetchPokemonData();
        checkFavoriteStatus();  // Verificar si el Pokémon ya está en favoritos

    }, [name]); // El useEffect se ejecuta cuando cambia el nombre del Pokémon

    const toggleFavorite = async () => {
        if (!pokemon) return;
    
        const urlAdd = "http://192.168.1.67:8000/api/favorites/create/";
        const urlRemove = `http://192.168.1.67:8000/api/favorites/delete/${pokemon.name}/`;
    
        try {
            if (isFavorite) {
                // Eliminar de favoritos
                const response = await axios.delete(urlRemove);
                if (response.status === 204) {
                    setIsFavorite(false);
                    Toast.show({
                        description: "Pokemon removed from favorites!",
                        placement: "top",
                    });
                }
            } else {
                // Agregar a favoritos
                const body = { name: pokemon.name };
                const response = await axios.post(urlAdd, body, {
                    headers: { "Content-Type": "application/json" },
                });
                if (response.status === 200 || response.status === 201) {
                    setIsFavorite(true);
                    Toast.show({
                        description: "Pokemon added to favorites!",
                        placement: "top",
                    });
                }
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response
                    ? error.response.data
                    : "Connection error. Please try again.";
                Toast.show({
                    description: errorMessage,
                    placement: "top",
                });
            } else {
                console.error("Unexpected error:", error);
                Toast.show({
                    description: "An unexpected error occurred.",
                    placement: "top",
                });
            }
        }
    };

    if (!pokemon || isSpeciesLoading) return <Skeleton.Text />; // Muestra el esqueleto mientras se carga

    const flavorText = removeEscapeCharacters(species?.flavor_text_entries?.[0]?.flavor_text || "No description available");

    return (
        <Stack>
            <Center 
                safeArea
                backgroundColor={getTypeColor(pokemon.types[0].type.name) + '.400'}
            >
                <Pressable 
                    onPress={toggleFavorite}
                    position={"absolute"}
                    top={10}
                    right={5}
                    zIndex={10}
                >
                    <Icon 
                        as={<AntDesign name={isFavorite ? "star" : "staro"} />} 
                        size={25} 
                        color={isFavorite ? "yellow" : "white"} 
                    />
                </Pressable>

                <AspectRatio ratio={1} width="80%">                    
                    <Image
                        source={{ uri: pokemon.sprites.other["official-artwork"].front_default }}
                        alt="Pokemon Image"
                    />
                </AspectRatio>

                <HStack
                    justifyContent={"space-between"}
                    width="100%"
                    padding={3}
                    alignItems={"Center"}
                    position={"absolute"}
                    bottom={0}
                    left={0}
                    right={0}
                >
                    <Heading color={"white"} textTransform={"capitalize"} size={"2xl"}>
                        {name}
                    </Heading>

                    <Heading color={"white"}>
                        #{formatNumber(pokemon.id)}
                    </Heading>
                </HStack>
            </Center>

            <Stack padding={3}>
                <HStack justifyContent={"center"}>
                    {pokemon.types.map((type, index) => (
                        <Center
                            key={index}
                            padding={1}
                            backgroundColor={getTypeColor(type.type.name) + ".600"}
                            minWidth={32}
                            rounded={"full"}
                            mx={2}
                        >
                            <Text textTransform={"capitalize"} color={"white"} fontSize={"lg"} fontWeight={"bold"}>
                                {type.type.name}
                            </Text>
                        </Center>
                    ))}
                </HStack>
                
                <Center> 
                    {isSpeciesLoading ? (
                        <Skeleton.Text />
                    ) : (
                        <Stack>
                            <Heading marginTop={4}>Description</Heading>
                            <Text 
                                marginTop={2} 
                                fontSize={'lg'} 
                                color='black'>
                                {flavorText}
                            </Text>
                        </Stack>
                    )}
                </Center>

                <Center>
                    <Stack marginTop={4}> 
                        <Heading marginTop={2}>Abilities</Heading>
                        {pokemon.abilities.map((abilityObj, index) => (
                            <Text 
                                key={index}
                                fontSize='lg'
                                color="black" 
                                textTransform="capitalize">
                                - {abilityObj.ability.name}
                            </Text>
                        ))}
                    </Stack>
                </Center>
            </Stack>
        </Stack>
    );
}
