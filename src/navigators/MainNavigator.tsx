import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../Screens/Home";
import { Search } from "../Screens/Search";
import { Detail } from "../Screens/Detail";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import type { MainStackParamList } from "./types";


const Stack = createNativeStackNavigator<MainStackParamList>()


export function MainNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} options={({ navigation }) => ({
                headerLargeTitle: true,
                headerTitle: 'Pokédex',
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MaterialIcons name="search" color= "black" size={32}/>
                    </TouchableOpacity>
                ),
            })}/>

            <Stack.Screen name='Detail' component={Detail}/>

            <Stack.Group screenOptions={{ presentation: 'modal'}}>
                <Stack.Screen name='Search' component={Search}/>
            </Stack.Group>

        </Stack.Navigator>
    )
}