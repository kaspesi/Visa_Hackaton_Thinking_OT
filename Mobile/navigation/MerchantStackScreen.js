import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MerchantListScreen from '../screens/MerchantListScreen';
import MerchantItemsScreen from '../screens/MerchantItemsScreen';

const MerchantStack = createStackNavigator();

export default () => {
	return (
		<MerchantStack.Navigator>
			<MerchantStack.Screen name="Home" component={HomeScreen} />
			<MerchantStack.Screen name="MerchantList" component={MerchantListScreen} />
			<MerchantStack.Screen name="MerchantItems" component={MerchantItemsScreen} />
		</MerchantStack.Navigator>
	);
};
