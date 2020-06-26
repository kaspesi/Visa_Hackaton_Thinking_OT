import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import logo from '../assets/SpendSafeLogoXLarge.png'

export default () => {
	return (
		<View style={styles.container}>
			<Image
				style={styles.logo}
				source={logo}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {

		height: 250,
		width: 250,
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 20
	},
	logo: {
		height: '100%',
		width: '100%'
	}
});
