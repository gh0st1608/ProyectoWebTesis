import DeliveryModel from "../../models/Delivery.model";

const getDeliverySocket = async (uid: string) => {
	try {
		const delivery = await DeliveryModel.find({user: uid}).populate('product', 'name price') // SELECT * FROM DELIVERY WHERE USER = uid
		return Promise.resolve({success: true, message: 'Pedidos lsitados', data: delivery})
	} catch (error) {
		return Promise.resolve({success: false, message: 'ha ocurrido un error', data: error});
	}
}

const updateDeliveryState = async (deliveryId: string, newState: string) => {
	try {
		const delivery = await DeliveryModel.findByIdAndUpdate(deliveryId, {
			state: newState
		}, {
			returnDocument: 'after'
		}); // Update('Delivery', state, value)
		if(!delivery){
			return Promise.resolve({success: false, message: 'Pedido no encontado', data: delivery})
		}
		return Promise.resolve({success: true, message: 'Pedidos actualizado', data: delivery})

	} catch (error) {
		return Promise.resolve({success: false, message: 'ha ocurrido un error', data: error});
		
	}
}

export {
	updateDeliveryState,
	getDeliverySocket
}