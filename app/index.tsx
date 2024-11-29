import { fetchData } from "@/src/utils/api";
import { MainNavigator } from "@/src/navigators/MainNavigator";
import { NativeBaseProvider } from "native-base";



fetchData();

export default function Index() {
    return (
        <NativeBaseProvider>
            <MainNavigator />
        </NativeBaseProvider>
    );
}