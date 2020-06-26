import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, AsyncStorage, Alert } from 'react-native';
import merchants from '../data/merchants';
import MerchantCard from '../components/MerchantCard';
import * as Location from 'expo-location';

export default ({ navigation }) => {
	const [ latitude, setLatitude ] = useState();
	const [ longitude, setLongitude ] = useState();
	const [ errorMessage, setErrorMessage ] = useState('');
	// const [ merchants, setMerchants ] = useState([]);

	useEffect(() => {
		const asyncEffect = async () => {
			let { status } = await Location.requestPermissionsAsync();

			if (status !== 'granted') {
				setErrorMessage('Location Access Permission Was Denied');

				return;

				// Might be better to kick user back to home screen instead of setting error message.
			}

			let location = await Location.getCurrentPositionAsync();
			setLatitude(location.coords.latitude);
			setLongitude(location.coords.longitude);

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
		<View style={styles.merchantList}>
			<View style={styles.headerContainer}>
				<Text style={styles.headerLocation}>Latitude: {latitude}</Text>

				<Text style={styles.headerLocation}>Longitude: {longitude}</Text>
			</View>

			{errorMessage ? (
				<Text style={errorMessage}>YOU DID NOT ALLOW LOCATION SERVICES</Text>
			) : (
				<View style={styles.listContainer}>
					<ScrollView style={styles.scroll}>
						<View style={styles.itemWrapper}>
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
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	merchantList: {
		backgroundColor: 'darksalmon'
	},
	scroll: {
		width: '100%',
		height: '95%'
	},
	headerContainer: {
		backgroundColor: 'firebrick',
		width: '100%',
		borderBottomWidth: 3
	},
	headerLocation: {
		fontSize: 14,
		fontWeight: '700'
	},
	errorMessage: {
		color: 'red',
		fontWeight: '700'
	}
});
