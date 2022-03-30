import express from 'express';
import cors from 'cors';
import initializeConfig from '../config/index'
import routes from '../routes/index.route';
import { Server, Socket } from 'socket.io';
import http from 'http';
import jwt from 'jsonwebtoken';
import { getDeliverySocket, updateDeliveryState } from './shared/socket/delivery.socket';

initializeConfig()


const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
	const { params, query, body } = request;
	console.log({params, query, body});
	response.send({
		success: true,
		message: 'El Servidor se esta ejecutando correctamente!'
	});
});


app.use('/api', routes);
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
	}
});


export {
	io
}


app.init = () => {
    let PORT = process.env.PORT_DEV; // 80 - 655NN
    let HOST: string = `http://localhost:${PORT}`;

    app.listen(PORT, () => {
	console.log(`El servidor se esta ejecutando en el puerto ${PORT}, visite: ${HOST} `);
	console.log(`El ambiente de desarrollo es: ${process.env.NODE_ENV}`)
});

	io.on('connection', (client: Socket) => {
		client.on('testing', data => {
			console.log("Se ejecuto testing: ", data);
		} )

		client.on('join-to-my-room', (token) => {
			const { uid } : any = jwt.decode(token);
			client.join(uid);
			console.log('client added to room ', uid)
		})

		client.on('delivery-tracking', async (token: string) => {
			const { uid } : any = jwt.decode(token);
			const data = await getDeliverySocket(uid);
			console.log({data})
			io.to(client.id).emit('delivery-getted', data);
		} )

		client.on('delivery-updated', async ({deliveryId, newState, userId}) => {
			const data = await updateDeliveryState(deliveryId, newState);
			console.log("delivery updated")
			io.to(userId).emit('delivery-update', data)
		})
		console.log('client connected!')
	})

	/*
export {
	io
}
*/

}





export default app


//app.use('/api', routes);
