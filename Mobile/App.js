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
			console.log('token is', storageToken, typeof storageToken);

			const storageMerchantId = await AsyncStorage.getItem('merchantId');
			if (storageMerchantId !== null && storageMerchantId !== -1)
				setConfirmedMerchantId(parseInt(storageMerchantId, 10));

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
				<AuthContext.Provider value={{ setIsAuth }}>
					<MerchantIdContext.Provider value={{ confirmedMerchantId, setConfirmedMerchantId }}>
						<CartContext.Provider value={{ cart, setCart }}>
							<Tab.Navigator
								screenOptions={({ route }) => ({
									tabBarIcon: () => {
										let iconName;

										if (route.name === 'Home') {
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
									inactiveTintColor: 'white',
									style: {
										height: 85,
										paddingTop: 5,
										backgroundColor: '#1B263B'
									}
								}}
							>
								<Tab.Screen name="Home" component={MerchantStackScreen} />
								<Tab.Screen name="Scanner" component={ScannerStackScreen} />
								<Tab.Screen name="Cart" component={CartStackScreen} />
							</Tab.Navigator>
						</CartContext.Provider>
					</MerchantIdContext.Provider>
				</AuthContext.Provider>
			) : (
				<AuthContext.Provider value={{ setIsAuth }}>
					<StartStackScreen />
				</AuthContext.Provider>
			)}
		</NavigationContainer>
	);
};
