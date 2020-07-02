import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScannerScreen from '../screens/ScannerScreen';

const ScannerStack = createStackNavigator();

export default () => {
	return (
		<ScannerStack.Navigator
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
			<ScannerStack.Screen name="Scanner" component={ScannerScreen} />
		</ScannerStack.Navigator>
	);
};
