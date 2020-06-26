import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import StartStackScreen from './navigation/StartStackScreen';
import MerchantStackScreen from './navigation/MerchantStackScreen';
import ScannerStackScreen from './navigation/ScannerStackScreen';
import CartStackScreen from './navigation/CartStackScreen';

import AuthContext from './context/AuthContext';
import MerchantContext from './context/MerchantContext';
import CartContext from './context/CartContext';

const Tab = createBottomTabNavigator();

export default () => {
	const [ isAuth, setIsAuth ] = useState(true);
	// Both confirmedMerchant and JSON.stringify(cart) will persist in AsyncStorage.
	const [ confirmedMerchant, setConfirmedMerchant ] = useState(-1); // merchantId
	const [ cart, setCart ] = useState([]);

	// On initial app mount, I need to check async storage to see if we have the auth token to set isAuth.
	useEffect(() => {
		const effectCallback = async () => {
			const result = await AsyncStorage.getItem('token');

			// The JWT exists, set isAuth to true. (Technically you should verify in backend).
			if (result) {
				setIsAuth(true);
			}
		};

		effectCallback();
	}, []);

	return (
		// If we are authenticated, show the home screen, otherwise show the start screen with register/login.
		<NavigationContainer>
			{isAuth ? (
				<MerchantContext.Provider value={{ confirmedMerchant, setConfirmedMerchant }}>
					<CartContext.Provider value={{ cart, setCart }}>
						<Tab.Navigator
							screenOptions={({ route }) => ({
								tabBarIcon: () => {
									let iconName;

									if (route.name === 'Merchant') {
										iconName = 'ios-home';
									} else if (route.name === 'Scanner') {
										iconName = 'md-qr-scanner';
									} else if (route.name === 'Cart') {
										iconName = 'ios-cart';
									}

									return <Ionicons name={iconName} size={30} color="white" />;
								}
							})}
							tabBarOptions={{
								activeTintColor: 'tomato',
								inactiveTintColor: 'gray',
								style: {
									height: 70,
									backgroundColor: 'black'
								}
							}}
						>
							<Tab.Screen name="Merchant" component={MerchantStackScreen} />
							<Tab.Screen name="Scanner" component={ScannerStackScreen} />
							<Tab.Screen name="Cart" component={CartStackScreen} />
						</Tab.Navigator>
					</CartContext.Provider>
				</MerchantContext.Provider>
			) : (
				<AuthContext.Provider value={{ setIsAuth }}>
					<StartStackScreen />
				</AuthContext.Provider>
			)}
		</NavigationContainer>
	);
};
