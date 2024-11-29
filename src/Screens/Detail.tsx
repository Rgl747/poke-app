import { MainStackScreenProps } from "../navigators/types";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import { AspectRatio, Image, Heading, Stack, HStack, Center, Text, Skeleton } from "native-base";
import { getTypeColor, formatNumber } from "../utils/Helper";
import { removeEscapeCharacters } from "../utils/Helper"; 

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

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
        
        fetchData(url).then((data) => {
            setPokemon(data);  

            if (data?.species?.url) {
                fetchData(data.species.url).then((speciesData) => {
                    setSpecies(speciesData);  
                    setIsSpeciesLoading(false); 
                });
            }
        });
    }, [name]);  

    if (!pokemon || isSpeciesLoading) return null;  

    
    const flavorText = removeEscapeCharacters(species?.flavor_text_entries?.[0]?.flavor_text || "No description available");

    return (
        <Stack>
            <Center 
                safeArea
                backgroundColor={getTypeColor(pokemon.types[0].type.name) + '.400'}
            >
                <AspectRatio ratio={1} width="80%">
                    <Image
                        source={{
                            uri: pokemon.sprites.other["official-artwork"].front_default,
                        }}
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
