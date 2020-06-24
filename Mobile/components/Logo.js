import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default () => {
	return (
		<View style={styles.container}>
			<Image
				style={styles.logo}
				source={{
					uri:
						'https://images.all-free-download.com/images/graphicthumb/beautiful_natural_scenery_and_sun_vector_587168.jpg'
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 200,
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
