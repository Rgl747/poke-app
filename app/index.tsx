import { fetchData } from "@/src/utils/api";
import { MainNavigator } from "@/src/navigators/MainNavigator";
import { NavigationContainer } from "@react-navigation/native";

fetchData();

export default function Index() {
    return (
        <MainNavigator/>
    );
}