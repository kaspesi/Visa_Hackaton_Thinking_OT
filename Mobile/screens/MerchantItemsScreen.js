import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MerchantItem from '../components/MerchantItem';
import items from '../data/items';

export default ({ route }) => {
	const { id, name, street, city, state, country, zip } = route.params;

	// const [ items, setItems ] = useState([]);

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
		<View style={styles.merchantItems}>
			<View style={styles.headerContainer}>
				<Text style={styles.headerTitle}>{name}</Text>
				<Text style={styles.headerDescription}>
					{street} {city} {state} {zip}
				</Text>
			</View>

			<View style={styles.itemsContainer}>
				<ScrollView style={styles.scroll}>
					<View style={styles.itemsWrapper}>
						{items.filter((item) => item.merchantId === id).map((item) => {
							return (
								<View key={item.itemId}>
									<MerchantItem {...item} />
								</View>
							);
						})}
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	merchantItems: {
		backgroundColor: 'darksalmon'
	},
	scroll: {
		width: '100%',
		height: '100%'
	},
	headerContainer: {
		backgroundColor: 'orangered',
		width: '100%',
		padding: 20,
		borderBottomWidth: 3
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: '700'
	},
	headerDescription: {
		fontSize: 14
	}
});
