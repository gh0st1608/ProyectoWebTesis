import logo from './logo.svg';
import './App.css';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import Footer from './components/Footer';

function App() {
  return (
    <div class="wrapper">
      <Header/>
      <Sidebar/>
      <Dashboard/>
      <Footer/>
    </div>
  );
}

export default App;