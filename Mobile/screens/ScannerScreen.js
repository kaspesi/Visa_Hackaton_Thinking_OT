import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button, Alert, AsyncStorage } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import MerchantIdContext from '../context/MerchantIdContext';
import CartContext from '../context/CartContext';

export default () => {
	const [ hasPermission, setHasPermission ] = useState(null);
	const [ scanned, setScanned ] = useState(false);

	const { confirmedMerchantId, setConfirmedMerchantId } = useContext(MerchantIdContext);
	const { cart, setCart } = useContext(CartContext);

	useEffect(() => {
		const asyncEffect = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		};
		asyncEffect();
	}, []);

	useEffect(
		() => {
			const asyncEffect = async () => {
				await AsyncStorage.setItem('merchantId', confirmedMerchantId.toString());
			};
			asyncEffect();
		},
		[ confirmedMerchantId ]
	);

	useEffect(
		() => {
			const asyncEffect = async () => {
				await AsyncStorage.setItem('cart', JSON.stringify(cart));
			};
			asyncEffect();
		},
		[ cart ]
	);

	const addToCart = async (name, price, item_id, merch_id) => {
		if ((merch_id.toString() !== confirmedMerchantId) & (cart.length > 0)) {
			Alert.alert(
				'Rejected Buy!',
				'You have an item from another merchant in your cart, please remove it first.',
				[
					{
						text: 'Okay Sure',
						style: 'default'
					}
				]
			);

			return;
		}

		if (cart.length === 0) {
			setConfirmedMerchantId(merch_id.toString());
			setCart([
				{
					itemId: item_id.toString(),
					name,
					price,
					quantity: 1
				}
			]);

			Alert.alert('Item added!', 'You should see the item in cart.', [
				{
					text: 'Okay Sure',
					style: 'default'
				}
			]);

			return;
		}

		if (merch_id.toString() === confirmedMerchantId) {
			const foundIndex = cart.findIndex((item) => item.itemId === item_id.toString());

			let itemExists;
			if (foundIndex === -1) itemExists = false;
			else itemExists = true;

			if (itemExists) {
				const tempCart = cart;
				tempCart[foundIndex].quantity += 1;
				setCart([ ...tempCart ]);
			} else {
				setCart([
					...cart,
					{
						itemId: item_id.toString(),
						name,
						price,
						quantity: 1
					}
				]);
			}

			Alert.alert('Item added!', 'You should see the item in cart, second case.', [
				{
					text: 'Okay Sure',
					style: 'default'
				}
			]);

			return;
		}

		Alert.alert('Error!', 'Did not account for this case.', [
			{
				text: 'Okay Sure',
				style: 'default'
			}
		]);
	};

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);

		data = data.replace(/{/g, '');
		data = data.replace(/}/g, '');
		data = data.replace(/\s/g, '');
		let arr = data.split(',');
		let newArr = [];
		arr.forEach((property) => {
			let temp = property.split(':');
			newArr.push(temp);
		});
		let newObj = {};
		newArr.forEach((entry) => {
			newObj[entry[0]] = entry[1];
		});
		data = { ...newObj };

		Alert.alert(
			'Item Scanned!',
			`Would you like to add ${data.item_id} ${data.name} ${data.price} ${data.merch_id} to your cart?`,
			[
				{
					text: 'Cancel',
					style: 'cancel'
				},
				{
					text: 'Okay Sure',
					style: 'default',
					onPress: () => addToCart(data.name, data.price, data.item_id, data.merch_id)
				}
			]
		);
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.scannerScreen}>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>

			{scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
		</View>
	);
};

const styles = StyleSheet.create({
	scannerScreen: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end'
	}
});
