import express from 'express';
import initializeConfig from '../config/index'
import routes from '../routes/index.route';

initializeConfig()


const app = express();

app.use(express.json());

app.get('/', (request, response) => {
	const { params, query, body } = request;
	console.log({params, query, body});
	response.send({
		success: true,
		message: 'El Servidor se esta ejecutando correctamente!'
	});
});


app.use('/api', routes);

app.init = () => {
    let PORT = process.env.PORT_DEV; // 80 - 655NN
    let HOST: string = `http://localhost:${PORT}`;

    app.listen(PORT, () => {
	console.log(`El servidor se esta ejecutando en el puerto ${PORT}, visite: ${HOST} `);
	console.log(`El ambiente de desarrollo es: ${process.env.NODE_ENV}`)
});

}





export default app


//app.use('/api', routes);
