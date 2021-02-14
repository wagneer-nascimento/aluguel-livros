import 'react-native-gesture-handler';
import React from 'react';
import {  View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <View style={{ flex: 1, backgroundColor: '#7159c1' }} >
                <Routes />
            </View>
        </NavigationContainer>
    );

}

export default App;