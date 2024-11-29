import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import { useNavigation } from "@react-navigation/native";
import { MainStackScreenProps } from "../navigators/types";
import { Box, Heading, Image, Text, HStack, Pressable, Center, AspectRatio, Skeleton } from "native-base";
import { getTypeColor, formatNumber } from "../utils/Helper";

interface PokemonCardProps {
    url: string;
}

interface Pokemon {
    name: string;
    id: number;
    sprites: {
        other: {
            'official-artwork': {
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
        <Pressable
            flex={1}
            margin={1.5}
            padding={4}
            backgroundColor={getTypeColor(pokemon.types[0].type.name) + '.400'}
            borderRadius={40}
            onPress={() => navigation.navigate('Detail', { name: pokemon.name, url })}
        >
            <Center>
                <AspectRatio ratio={1} width="80%">
                    <Image
                        source={{
                            uri: pokemon.sprites.other['official-artwork'].front_default,
                        }}
                        alt="image"
                    />
                </AspectRatio>
            </Center>

            <HStack justifyContent={"space-between"} marginBottom={2}>
                <Heading textTransform={"capitalize"} color={"white"} size={'sm'}>{pokemon.name}</Heading>
                <Text color={"white"}>#{formatNumber(pokemon.id)}</Text>
            </HStack>

            <HStack space={2} flexWrap="wrap">
                {pokemon.types.map((type, index) => (
                    <Box 
                    key={index} 
                    padding={2} 
                    marginRight={1} 
                    alignItems="center" 
                    backgroundColor={getTypeColor(type.type.name) + '.600'}
                    borderRadius={10}
                    >
                        <Text textTransform={"capitalize"} color={'white'} fontSize={'xs'}> {type.type.name} </Text>
                    </Box>
                ))}
            </HStack>
        </Pressable>
    );
}
