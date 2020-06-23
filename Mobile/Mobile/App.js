import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Button from './components/Button';
import StartStackScreen from './navigation/StartStackScreen';
import MerchantStackScreen from './navigation/MerchantStackScreen';
import ScannerStackScreen from './navigation/ScannerStackScreen';
import CartStackScreen from './navigation/CartStackScreen';

const Tab = createBottomTabNavigator();

export default () => {
	const [ isAuth, setIsAuth ] = useState(false);

	return (
		<NavigationContainer>
			{isAuth ? (
				<Tab.Navigator>
					<Tab.Screen name="Merchant" component={MerchantStackScreen} />
					<Tab.Screen name="Scanner" component={ScannerStackScreen} />
					<Tab.Screen name="Cart" component={CartStackScreen} />
				</Tab.Navigator>
			) : (
				<StartStackScreen setIsAuth={setIsAuth} />
			)}
		</NavigationContainer>
	);
};

// <NavigationContainer>
// 	{isAuth ? (
// 		<Tab.Navigator>
// 			<Tab.Screen name="Merchant" component={MerchantStackScreen} />
// 			<Tab.Screen name="Scanner" component={ScannerStackScreen} />
// 			<Tab.Screen name="Cart" component={CartStackScreen} />
// 		</Tab.Navigator>
// 	) : (
// 		<StartStackScreen />
// 	)}

// 	{/* <Stack.Navigator
// 		screenOptions={{
// 			headerStyle: {
// 				backgroundColor: 'palevioletred'
// 			},
// 			headerTintColor: '#fff',
// 			headerTitleStyle: {
// 				fontWeight: 'bold'
// 			}
// 		}}
// 	>
// 		<Stack.Screen
// 			name="Home"
// 			component={HomeScreen}
// 			options={{
// 				title: 'Home sweet home',
// 				headerRight: () => <Button buttonPressHandler={() => alert('this is a button')}>BUTTON</Button>
// 			}}
// 		/>
// 		<Stack.Screen
// 			name="MerchantList"
// 			component={MerchantListScreen}
// 			options={{ title: 'Nearby Merchants' }}
// 		/>
// 	</Stack.Navigator> */}
// </NavigationContainer>
