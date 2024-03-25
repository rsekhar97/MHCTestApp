import { NavigationContainer,DefaultTheme as NavigationDefaultTheme,DarkTheme as NavigationDarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ScreenOne from "./screens/ScreenOne";
import ScreenTwo from "./screens/ScreenTwo";

const Stack = createStackNavigator()

const App = () => {

    return(

        <NavigationContainer>

            <Stack.Navigator initialRouteName='ScreenOne'>

            <Stack.Screen
                name='ScreenOne'
                component={ScreenOne}
                options={{headerShown: false,gestureEnabled:false}}>
            </Stack.Screen>

            <Stack.Screen
                name='ScreenTwo'
                component={ScreenTwo}
                options={{headerShown: false,gestureEnabled:false}}>
            </Stack.Screen>

            </Stack.Navigator>
         
        </NavigationContainer>
    )
    

}
export default App
