import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from '../components/Button';

export default ({ id, name, street, city, state, country, zip }) => {
	return (
		<View style={styles.merchantCard}>
			<View style={styles.leftSection}>
				<View style={styles.upperCard}>
					<Text style={styles.upperCardText}>{name}</Text>
				</View>
				<View style={styles.lowerCard}>
					<Text style={styles.lowerCardText}>
						{street}, {city} {state}
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
		borderBottomWidth: 2,
		padding: 20,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	upperCard: {
		borderWidth: 2,
		borderColor: 'paleturquoise'
	},
	upperCardText: {
		fontSize: 24,
		fontWeight: '700'
	},
	lowerCard: {
		fontSize: 18,
		borderWidth: 2,
		borderColor: 'palegreen'
	},
	lowerCardText: {
		fontSize: 20
	},
	leftSection: {
		borderWidth: 2,
		width: '60%'
	},
	rightSection: {
		borderWidth: 2,
		width: '30%'
	}
});
