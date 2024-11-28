import { View, Text } from "react-native"

export function Detail({ route }){
    const { name } = route.params
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize: 40}}>{name}</Text>
        </View>
    )
}