import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default ({ route }) => {
	const { id, street, city } = route.params;

	const [ items, setItems ] = useState([]);

	useEffect(() => {
		// UNCOMMENT BELOW WHEN SERVER SETUP
		// // Here i need to fetch all the items that are associated with the merchant id.
		// const asyncEffect = async () => {
		// 	const response = await fetch('http://localhost:3001/items', {
		// 		method: 'post',
		// 		headers: {
		// 			'content-type': 'application/json',
		// 			'authorization': AsyncStorage.getItem('token')
		// 		},
		// 		body: JSON.stringify({
		// 			merchantId: id
		// 		})
		// 	});
		// 	const data = await response.json();
		// 	// Failure on fetch.
		// 	if (!data.success) {
		// 		Alert.alert('Failed To Get Nearby Stores', 'Backend failed to get merchants for some reason.', [
		// 			{
		// 				text: 'Okay Sure',
		// 				style: 'default'
		// 			}
		// 		]);
		// 		return;
		// 	}
		// 	// Successful fetch, set the items to state and render.
		// 	setItems(data.items);
		// };
		// asyncEffect();
	}, []);

	return (
		<View>
			<Text>This is the merchant items screen</Text>
			<Text>
				hello {id} {street} {city}
			</Text>

			<View style={styles.itemsContainer}>
				<View style={styles.itemsTitleContainer}>
					<Text style={styles.itemsTitle}>Available Items</Text>
				</View>

				<ScrollView style={styles.scroll}>
					<View style={styles.itemsWrapper}>
						{items.map((item) => {
							return <MerchantItem {...item} />;
						})}
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({});
