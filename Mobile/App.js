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
import MerchantIdContext from './context/MerchantIdContext';
import CartContext from './context/CartContext';

const Tab = createBottomTabNavigator();

export default () => {
	const [ isAuth, setIsAuth ] = useState(false);
	// Both confirmedMerchantId and JSON.stringify(cart) will persist in AsyncStorage.
	const [ confirmedMerchantId, setConfirmedMerchantId ] = useState(-1); // merchantId
	const [ cart, setCart ] = useState([]);

	// On initial load, fetch token, merchantId, and cart from async storage to set state.
	useEffect(() => {
		const effectCallback = async () => {
			const storageToken = await AsyncStorage.getItem('token');
			if (storageToken) setIsAuth(true);

			const storageMerchantId = await AsyncStorage.getItem('merchantId');
			if (storageMerchantId !== null && storageMerchantId !== -1)
				setConfirmedMerchantId(parseInt(storageMerchantId, 10));
			console.log(storageMerchantId);

			const storageCartString = await AsyncStorage.getItem('cart');
			const storageCart = JSON.parse(storageCartString);
			if (storageCart !== null && storageCart.length !== 0) setCart(storageCart);
		};
		effectCallback();
	}, []);

	return (
		// If we are authenticated, show the home screen, otherwise show the start screen with register/login.
		<NavigationContainer>
			{isAuth ? (
				<MerchantIdContext.Provider value={{ confirmedMerchantId, setConfirmedMerchantId }}>
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
				</MerchantIdContext.Provider>
			) : (
				<AuthContext.Provider value={{ setIsAuth }}>
					<StartStackScreen />
				</AuthContext.Provider>
			)}
		</NavigationContainer>
	);
};
