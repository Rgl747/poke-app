import React, { useEffect, useState } from "react";
import { FlatList, Box, Text, Center, Heading, Spinner, VStack, Image } from "native-base";

interface FavoritePokemon {
    name: string;
    id: number;
    sprite: string;
}

export function Favorite() {
    const [favorites, setFavorites] = useState<FavoritePokemon[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/favorites/");
                if (response.ok) {
                    const data = await response.json();
                    setFavorites(data);
                } else {
                    console.error("Error al cargar favoritos.");
                }
            } catch (error) {
                console.error("Error de conexión:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    if (isLoading) {
        return (
            <Center flex={1} bg="white">
                <Spinner size="lg" />
            </Center>
        );
    }

    return (
        <Center flex={1} bg="white" padding={4}>
            {favorites.length === 0 ? (
                <Text fontSize="lg" color="gray.500">
                    Favorite pokemon not added
                </Text>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Box
                            bg="blue.100"
                            padding={4}
                            margin={2}
                            borderRadius={8}
                            shadow={2}
                            alignItems="center"
                        >
                            <VStack space={2} alignItems="center">
                                <Heading fontSize="lg" textTransform="capitalize">
                                    {item.name}
                                </Heading>
                                <Box>
                                    <Center>
                                        <Text fontSize="sm" color="black">
                                            #{item.id}
                                        </Text>
                                        <Box
                                            width="100px"
                                            height="100px"
                                            borderRadius="full"
                                            bg="white"
                                            overflow="hidden"
                                        >
                                            <Image
                                                source={{ uri: item.sprite }}
                                                alt={item.name}
                                                size="100px"
                                            />
                                        </Box>
                                    </Center>
                                </Box>
                            </VStack>
                        </Box>
                    )}
                    contentContainerStyle={{ padding: 10 }}
                />
            )}
        </Center>
    );
}
