import Rutas from './routes';
import AuthState from './context/auth/AuthState';
import ProductState from './context/products/ProductState';

function App() {
  return (
    <AuthState>
      <ProductState>
        <Rutas />;
      </ProductState>
    </AuthState>
  );
}

export default App;
