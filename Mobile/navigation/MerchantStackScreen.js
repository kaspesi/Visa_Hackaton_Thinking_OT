import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MerchantListScreen from '../screens/MerchantListScreen';
import MerchantItemsScreen from '../screens/MerchantItemsScreen';

const MerchantStack = createStackNavigator();

export default () => {
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
					title: 'Welcome'
				}}
			/>
			<MerchantStack.Screen
				name="MerchantList"
				component={MerchantListScreen}
				options={{
					title: 'Nearby Merchants'
				}}
			/>
			<MerchantStack.Screen name="MerchantItems" component={MerchantItemsScreen} />
		</MerchantStack.Navigator>
	);
};
