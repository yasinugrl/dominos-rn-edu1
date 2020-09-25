import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import List from './Screens/List'
import ListDetail from './Screens/ListDetail'


const Stack = createStackNavigator();

function LogoTitle() {
    return (
        <Image
            style={{ width: 50, height: 50, marginBottom: 10 }}
            source={require('../src/img/logo.png')}
        />
    );
}

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#1DA1F2',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >

                <Stack.Screen
                    options={{
                        headerTitle: props => <LogoTitle {...props} />,
                        headerRight: () => (
                            <Text
                                onPress={() => {

                                }}
                                style={{
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                    color: 'white',
                                    padding: 5

                                }}>+</Text>
                        ),
                        headerLeft: () => (
                            <Text
                                onPress={() => {

                                }}
                                style={{
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                    color: 'white',
                                    padding: 5

                                }}>-</Text>
                        ),
                    }}
                    name="List"
                    component={List}
                />


                <Stack.Screen
                    options={{
                        title: 'Karakter Detay',
                    }}

                    name="ListDetail"
                    component={ListDetail} />


            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;