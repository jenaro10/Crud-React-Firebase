
import './App.css';


// Importar nuestros componentes
import Show from './componentes/Show'; 
import Edit from './componentes/Edit'; 
import Create from './componentes/Create'; 

// Importamos el router 
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Show /> } />
        <Route path='/create' element={ <Create /> } />
        <Route path='/edit/:id' element={ <Edit /> } />
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
