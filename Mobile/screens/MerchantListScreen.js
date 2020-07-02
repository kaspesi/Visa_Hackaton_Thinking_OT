import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import MerchantCard from '../components/MerchantCard';
import * as Location from 'expo-location';

export default ({ navigation }) => {
	const [ latitude, setLatitude ] = useState();
	const [ longitude, setLongitude ] = useState();
	const [ errorMessage, setErrorMessage ] = useState('');
	const [ merchants, setMerchants ] = useState([]);

	useEffect(() => {
		const asyncEffect = async () => {
			let { status } = await Location.requestPermissionsAsync();

			if (status !== 'granted') {
				setErrorMessage('Location Access Permission Was Denied');

				return;
			}

			let location = await Location.getCurrentPositionAsync();
			setLatitude(location.coords.latitude);
			setLongitude(location.coords.longitude);

			const response = await fetch(
				`https://frozen-peak-79158.herokuapp.com/nearby-merchants?latitude=${location.coords.latitude.toString()}&longitude=${location.coords.longitude.toString()}`
			);
			const data = await response.json();

			if (!data.success) {
				Alert.alert('Failed To Get Nearby Stores', 'Backend failed to get merchants for some reason.', [
					{
						text: 'Okay Sure',
						style: 'default'
					}
				]);

				return;
			}

			// Otherwise set merchants to []{} and render the merchant list with the data.
			setMerchants(data.nearby_stores);
		};

		asyncEffect();
	}, []);

	return (
		<View style={styles.merchantList}>
			{/* <View style={styles.headerContainer}>
				<Text style={styles.headerLocation}>Latitude: {latitude}</Text>

				<Text style={styles.headerLocation}>Longitude: {longitude}</Text>
			</View> */}

			{errorMessage ? (
				<Text style={errorMessage}>YOU DID NOT ALLOW LOCATION SERVICES</Text>
			) : (
				<View style={styles.listContainer}>
					<ScrollView style={styles.scroll}>
						<View style={styles.itemWrapper}>
							{merchants.length ? (
								merchants.map((merchant) => {
									return (
										<View key={merchant.merch_id}>
											<MerchantCard {...merchant} navigation={navigation} />
										</View>
									);
								})
							) : (
								<Text>Loading...</Text>
							)}
						</View>
					</ScrollView>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	merchantList: {
		backgroundColor: '#E0E1DD',
		paddingTop: 20,
	},
	scroll: {
		width: '100%',
		height: '100%'
	},
	headerContainer: {
		backgroundColor: 'cornflowerblue',
		width: '100%',
		height: 50,
		justifyContent: 'center',
		paddingLeft: 10
	},
	headerLocation: {
		fontSize: 14,
		fontWeight: '700',
		color: 'white'
	},
	errorMessage: {
		color: 'red',
		fontWeight: '700'
	}
});
