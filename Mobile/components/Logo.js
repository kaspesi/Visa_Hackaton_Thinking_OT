import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import logo from '../assets/SpendSafeLogoXLarge.png';

export default ({ dimensions }) => {
	return (
		<View
			style={
				dimensions ? (
					{ ...styles.container, height: dimensions.height, width: dimensions.width }
				) : (
					{ ...styles.container }
				)
			}
		>
			<Image style={styles.logo} source={logo} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 200,
		width: 200,
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
