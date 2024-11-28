import { fetchData } from "@/src/utils/api";
import { MainNavigator } from "@/src/navigators/MainNavigator";

fetchData();

export default function Index() {
    return (
        <MainNavigator />
    );
}