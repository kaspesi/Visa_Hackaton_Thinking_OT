import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

const CartStack = createStackNavigator();

export default () => {
	return (
		<CartStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: '#1B263B'
				},
				headerTintColor: 'white',
				headerTitleStyle: {
					fontWeight: 'bold',
					fontSize: 20,
				}
			}}
		>
			<CartStack.Screen name="Cart" component={CartScreen} options={{ title: 'Cart' }} />
			<CartStack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout!' }} />
		</CartStack.Navigator>
	);
};
