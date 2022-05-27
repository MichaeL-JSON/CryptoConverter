import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './components/AppRouter';
import NavBar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
