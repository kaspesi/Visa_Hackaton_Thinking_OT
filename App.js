import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from './screens/StartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import MerchantListScreen from './screens/MerchantListScreen';
import Button from './components/Button';

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: 'palevioletred'
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold'
					}
				}}
			>
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{
						title: 'Home sweet home',
						headerRight: () => <Button buttonPressHandler={() => alert('this is a button')}>BUTTON</Button>
					}}
				/>
				<Stack.Screen
					name="MerchantList"
					component={MerchantListScreen}
					options={{ title: 'Nearby Merchants' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
