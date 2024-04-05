import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom';
import CategoryPage from './components/Category';
import FrontPage from './components/FrontPage';
import Item from './components/Item';
import SearchPage from './components/SearchPage';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<FrontPage/>} />
          <Route path='/item/:id' element={<Item/>} />
          <Route path='/search' element={<SearchPage/>} />
          <Route path="/categories/:category" element={<CategoryPage/>} />
        </Routes>
      </Router>
    );
  }

export default App;
