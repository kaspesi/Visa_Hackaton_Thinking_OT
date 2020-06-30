import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MerchantItem from '../components/MerchantItem';

export default ({ route }) => {
	const { merch_id, name, latitude, longitude } = route.params;

	const [ items, setItems ] = useState([]);

	useEffect(() => {
		const asyncEffect = async () => {
			const response = await fetch(`https://frozen-peak-79158.herokuapp.com/merchant-items?merch_id=${merch_id}`);
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

			setItems(data.items);
		};
		asyncEffect();
	}, []);

	return (
		<View style={styles.merchantItems}>
			<View style={styles.headerContainer}>
				<Text style={styles.headerTitle}>{name}</Text>
			</View>

			<View style={styles.itemsContainer}>
				<ScrollView style={styles.scroll}>
					<View style={styles.itemsWrapper}>
						{items.length ? (
							items.map((item) => {
								return (
									<View key={item.item_id}>
										<MerchantItem {...item} />
									</View>
								);
							})
						) : null}
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	merchantItems: {
		backgroundColor: 'white'
	},
	scroll: {
		width: '100%',
		height: '85%'
	},
	headerContainer: {
		backgroundColor: 'cornflowerblue',
		width: '100%',
		padding: 20,
		borderBottomWidth: 3
	},
	headerTitle: {
		fontSize: 30,
		fontWeight: '700'
	}
});
