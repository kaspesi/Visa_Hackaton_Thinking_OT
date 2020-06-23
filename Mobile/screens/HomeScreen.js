import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from '../components/Button';

export default ({ navigation }) => {
	return (
		<View style={styles.screen}>
			<Text>This is the home screen</Text>
			<Button buttonPressHandler={() => navigation.navigate('MerchantList', { dumb: 'stupidparams' })}>
				Nearby Merchants
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
