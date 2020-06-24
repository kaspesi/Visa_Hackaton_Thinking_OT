import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import StartStackScreen from './navigation/StartStackScreen';
import MerchantStackScreen from './navigation/MerchantStackScreen';
import ScannerStackScreen from './navigation/ScannerStackScreen';
import CartStackScreen from './navigation/CartStackScreen';

const Tab = createBottomTabNavigator();

export default () => {
	const [ isAuth, setIsAuth ] = useState(false);

	// On initial app mount, I need to check async storage to see if we have the auth token to set isAuth.
	useEffect(() => {
		console.log('use effect runs on mount...');
	}, []);

	return (
		// If we are authenticated, show the home screen, otherwise show the start screen with register/login.
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
