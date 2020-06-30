import React, { useContext } from 'react';
import { AsyncStorage, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MerchantListScreen from '../screens/MerchantListScreen';
import MerchantItemsScreen from '../screens/MerchantItemsScreen';
import AuthContext from '../context/AuthContext';
import MerchantIdContext from '../context/MerchantIdContext';
import CartContext from '../context/CartContext';

const MerchantStack = createStackNavigator();

export default () => {
	const { setConfirmedMerchantId } = useContext(MerchantIdContext);
	const { setCart } = useContext(CartContext);
	const { setIsAuth } = useContext(AuthContext);

	const logoutHandler = async () => {
		await AsyncStorage.removeItem('token');
		await AsyncStorage.removeItem('cart');
		await AsyncStorage.removeItem('merchantId');

		setConfirmedMerchantId(-1);
		setCart([]);
		setIsAuth(false);
	};

	return (
		<MerchantStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: 'palevioletred'
				},
				headerTintColor: 'white',
				headerTitleStyle: {
					fontWeight: 'bold'
				}
			}}
		>
			<MerchantStack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					title: 'Welcome',
					headerRight: () => (
						<TouchableOpacity onPress={logoutHandler} style={styles.logoutContainer}>
							<Text style={styles.logoutText}>Logout</Text>
						</TouchableOpacity>
					)
				}}
			/>
			<MerchantStack.Screen
				name="MerchantList"
				component={MerchantListScreen}
				options={{
					title: 'Nearby Merchants'
				}}
			/>
			<MerchantStack.Screen
				name="MerchantItems"
				component={MerchantItemsScreen}
				options={{
					title: 'Merchant Items'
				}}
			/>
		</MerchantStack.Navigator>
	);
};

const styles = StyleSheet.create({
	logoutText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: '700'
	},
	logoutContainer: {
		padding: 5,
		marginRight: 10
	}
});
