import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

const CartStack = createStackNavigator();

export default () => {
	return (
		<CartStack.Navigator>
			<CartStack.Screen name="Cart" component={CartScreen} />
			<CartStack.Screen name="Checkout" component={CheckoutScreen} />
		</CartStack.Navigator>
	);
};
