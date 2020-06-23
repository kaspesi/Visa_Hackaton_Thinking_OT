import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from '../components/Button';

export default ({ navigation, route }) => {
	const { dumb } = route.params;

	return (
		<View style={styles.screen}>
			<Text>This is the merchant list screen</Text>
			<Text>{dumb}</Text>
			<Button buttonPressHandler={() => navigation.push('MerchantList')}>Nearby Merchants</Button>
			<Button buttonPressHandler={() => navigation.navigate('Home')}>Home</Button>
			<Button buttonPressHandler={() => navigation.goBack()}>Back</Button>
			<Button buttonPressHandler={() => navigation.popToTop()}>Top</Button>
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
