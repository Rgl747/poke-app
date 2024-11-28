import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type MainStackParamList = {
    Home: undefined;
    Search: undefined;
    Detail: { name: string }
}

export type MainStackScreenProps<T extends keyof MainStackParamList> = 
    NativeStackNavigationProp<MainStackParamList, T>;