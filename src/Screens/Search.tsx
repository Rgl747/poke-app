import { Stack, Center, Spinner, Icon, Input, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { fetchData } from "../utils/api";
import { useNavigation } from "@react-navigation/native";

type NavigationProps = {
    navigate: (screen: string, params?: { name: string }) => void;
};

export function Search() {
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const navigation = useNavigation<NavigationProps>();

    const searchPokemon = async (name: string) => {
        if (!name.trim()) {
            setError("Please enter a Pokémon name or number.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
            const data = await fetchData(url);

            if (data) {
                navigation.navigate("Detail", { name: data.name });
            } else {
                setError(`Pokémon "${name}" not found.`);
            }
        } catch (err: any) {
            if (err.response?.status === 404) {
                setError(`Pokémon "${name}" not found.`);
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        } finally {
            setIsLoading(false);
            setText(""); 
        }
    };

    return (
        <Stack flex={1} padding={4}>
            <Input
                placeholder="Search Pokémon by name or number"
                backgroundColor={"white"}
                rounded={"xl"}
                paddingY={3}
                paddingX={1}
                fontSize={14}
                returnKeyType="search"
                value={text}
                onChangeText={setText}
                onSubmitEditing={() => searchPokemon(text)}
                InputLeftElement={
                    <Icon
                        margin={2}
                        marginLeft={3}
                        size={6}
                        color={"gray.400"}
                        as={<MaterialIcons name="search" />}
                    />
                }
            />

            {isLoading && (
                <Center mt={5}>
                    <Spinner size="lg" />
                </Center>
            )}

            {error && (
                <Center mt={5}>
                    <Text color="red.500" fontSize="md">
                        {error}
                    </Text>
                </Center>
            )}
        </Stack>
    );
}
