import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Button from './components/Button';
import StartScreen from './screens/StartScreen';

export default function App() {
	return (
		<View style={styles.container}>
			<StartScreen />
			{/* <Text>Open up App.js to start working on your app!</Text>
			<Button buttonPressHandler={() => {}}>Some Button text as props children</Button> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
