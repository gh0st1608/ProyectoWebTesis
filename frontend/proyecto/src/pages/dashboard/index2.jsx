import { useContext, useEffect } from 'react';
import Table from '../../components/Table';
import ProductsContext from '../../context/products/ProductContext';
const Dashboard = () => {
  const { listaProductos, deleteOk, obtenerProductos, eliminarProducto } =
    useContext(ProductsContext);

  useEffect(() => {
    obtenerProductos();
  }, []);

  useEffect(() => {
    if (deleteOk) {
      obtenerProductos();
    }
  }, [deleteOk]);

  return (
    <>
      <h1>Productos</h1>
      <Table
        listaProductos={listaProductos}
        eliminarProducto={eliminarProducto}
      />
    </>
  );
};

export default Dashboard;
