import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from './screens/ProductScreen'

const App = () => {
  return (
    <div className="app">
      <Router>
      <Header/>
        <main className="hero">
          <Routes>
              <Route path='/' element={<HomeScreen/>} />
              <Route path='/product/:id' element={<ProductScreen/>} />
          </Routes>
        </main>
      <Footer />
      </Router>
      </div>
  )
}

export default App
