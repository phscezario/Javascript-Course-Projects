import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Pages/Home';
import Main from './Pages/Main';

import GlobalStyle from './constants/style.css';

const Stack = createStackNavigator();

const screenOptions = {
    headerShown: false,
};

const Routes = () => {
    return (
        <NavigationContainer>
            <GlobalStyle />
            <Stack.Navigator initialRouteName='Home' screenOptions={screenOptions}>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Main' component={Main} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
