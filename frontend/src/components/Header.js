import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <nav>
          <Link to='/'><h1>Main</h1></Link>
          <ul>
              <li><Link to="/cart" className='liLink'><i className='fas fa-shopping-cart'></i>Cart</Link></li>
              <li><Link to="/login" className='liLink'><i className='fas fa-user'></i>Sign In</Link></li>
          </ul>
      </nav>
    </header>
  )
}

export default Header
