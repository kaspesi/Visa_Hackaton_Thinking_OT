import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../screens/StartScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';

const StartStack = createStackNavigator();

export default ({ setIsAuth }) => {
	return (
		<StartStack.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<StartStack.Screen name="Start" component={StartScreen} />
			<StartStack.Screen name="Register" component={RegisterScreen} />
			<StartStack.Screen name="Login" component={LoginScreen} initialParams={{ setIsAuth }} />
		</StartStack.Navigator>
	);
};
