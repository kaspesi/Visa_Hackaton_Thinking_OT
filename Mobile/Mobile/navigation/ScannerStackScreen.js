import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScannerScreen from '../screens/ScannerScreen';

const ScannerStack = createStackNavigator();

export default () => {
	return (
		<ScannerStack.Navigator>
			<ScannerStack.Screen name="Scanner" component={ScannerScreen} />
		</ScannerStack.Navigator>
	);
};
