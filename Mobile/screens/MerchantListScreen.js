import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import merchants from '../data/merchants';
import MerchantCard from '../components/MerchantCard';

export default ({ navigation }) => {
	return (
		<View style={styles.screen}>
			<ScrollView style={styles.scroll}>
				{merchants.map((merchant) => {
					return (
						<View key={merchant.id}>
							<MerchantCard {...merchant} />
						</View>
					);
				})}
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
	}
});

// on component mount I need to ask permission to get location services and save location as state. then i do the fetch request and render the merchanst after that.
// this should have a scroll view to look at all the merchanst.
