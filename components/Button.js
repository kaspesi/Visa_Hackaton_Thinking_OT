import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default ({ children, buttonPressHandler }) => {
	return (
		<TouchableOpacity onPress={buttonPressHandler} style={styles.buttonContainer}>
			<Text style={styles.buttonText}>{children}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		padding: 10,
		borderWidth: 2,
		borderColor: 'black',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonText: {
		color: 'red'
	}
});
