import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, AsyncStorage, Alert } from 'react-native';
import merchants from '../data/merchants';
import MerchantCard from '../components/MerchantCard';
import * as Location from 'expo-location';

export default ({ navigation }) => {
	const [ location, setLocation ] = useState([]);
	const [ errorMessage, setErrorMessage ] = useState('');
	// const [ merchants, setMerchants ] = useState([]);

	useEffect(() => {
		const asyncEffect = async () => {
			let { status } = await Location.requestPermissionsAsync();

			if (status !== 'granted') {
				setErrorMessage('Location Access Permission Was Denied');

				return;
			}

			let location = await Location.getCurrentPositionAsync();
			setLocation(location);

			// UNCOMMENT BELOW WHEN SERVER SETUP

			// // Now we do a POST request to /merchants giving longitude, latitude, and JWT as auth header.
			// const response = await fetch('http://localhost:3001/merchants', {
			// 	method: 'post',
			// 	headers: {
			// 		'content-type': 'application/json',
			// 		authorization: AsyncStorage.getItem('token')
			// 	},
			// 	body: JSON.stringify({
			// 		longitude: location.coords.longitude,
			// 		latitude: location.coords.latitude
			// 	})
			// });
			// const data = await response.json();

			// if (!data.success) {
			// 	Alert.alert('Failed To Get Nearby Stores', 'Backend failed to get merchants for some reason.', [
			// 		{
			// 			text: 'Okay Sure',
			// 			style: 'default'
			// 		}
			// 	]);

			// 	return;
			// }

			// // Otherwise set merchants to []{} and render the merchant list with the data.
			// setMerchants(data.merchants);
		};

		asyncEffect();
	}, []);

	return (
		<View style={styles.screen}>
			{errorMessage ? <Text>{errorMessage}</Text> : <Text>{JSON.stringify(location)}</Text>}
			<Text />
			<ScrollView style={styles.scroll}>
				<View style={styles.merchantsWrapper}>
					{merchants.map((merchant) => {
						return (
							<View key={merchant.id}>
								<MerchantCard {...merchant} navigation={navigation} />
							</View>
						);
					})}
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	scroll: {
		width: '100%'
	},
	merchantsWrapper: {
		alignItems: 'center',
		justifyContent: 'center'
	}
});
