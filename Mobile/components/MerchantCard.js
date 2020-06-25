import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from '../components/Button';

export default ({ id, name, street, city, state, country, zip }) => {
	return (
		<View style={styles.merchantCard}>
			<View style={styles.leftSection}>
				<View style={styles.upperCard}>
					<Text style={styles.upperCardText}>
						{id} {name}
					</Text>
				</View>
				<View style={styles.lowerCard}>
					<Text style={styles.lowerCardText}>
						{street}, {city} {state}, {country} {zip}
					</Text>
				</View>
			</View>
			<View style={styles.rightSection}>
				<Button buttonPressHandler={() => {}}>Details</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	merchantCard: {
		borderWidth: 3,
		borderRadius: 20,
		padding: 20,
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	upperCard: {
		fontSize: 20,
		fontWeight: '700',
		borderWidth: 2,
		borderColor: 'paleturquoise'
	},
	lowerCard: {
		fontSize: 18,
		borderWidth: 2,
		borderColor: 'palegreen'
	}
});
