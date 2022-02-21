import React from 'react'

const Header = () => {
  return (
    <header>
      <nav>
          <h1>Main</h1>
          <ul>
              <li><i className='fas fa-shopping-cart'></i>Cart</li>
              <li><i className='fas fa-user'></i>Sign In</li>
          </ul>
      </nav>
    </header>
  )
}

export default Header
