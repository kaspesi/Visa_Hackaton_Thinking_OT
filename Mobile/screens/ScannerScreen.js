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
		console.log('add to cart triggered with merch_id', merch_id);

		if ((merch_id !== confirmedMerchantId) & (cart.length > 0)) {
			console.log(
				'first',
				merch_id,
				confirmedMerchantId,
				cart.length,
				merch_id !== confirmedMerchantId,
				cart.length !== 0,
				(merch_id !== confirmedMerchantId) & (cart.length > 0),
				typeof merch_id,
				typeof confirmedMerchantId
			);

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
			setConfirmedMerchantId(merch_id);
			setCart([
				{
					itemId: item_id,
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

		if (merch_id === confirmedMerchantId) {
			const foundIndex = cart.findIndex((item) => item.itemId === item_id);

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
						itemId: item_id,
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

		console.log(item_id, name, price, merch_id);

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
			if (entry[1] === 'item_id' || entry[1] === 'merch_id') newObj[entry[0]] = parseInt(entry[1], 10);
			else newObj[entry[0]] = entry[1];
		});
		data = { ...newObj };

		Alert.alert(
			'Item Scanned!',
			`Would you like to add ${data.item_id} ${data.name} ${data.price} ${data.merch_id} to your cart?`,
			[
				{
					text: 'Cancel',
					style: 'cancel',
					onPress: () => console.log('Pressed Cancel Button...')
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
