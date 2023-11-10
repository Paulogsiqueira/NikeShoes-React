import { NavLink, Link } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { LoginContext } from '@/context/LoginContext'
import { CartContext } from '@/context/CartContext';
import logo from '@/img/logo/shoes.png';
import cartIcon from '@/img/icon/cart.png';
import './Navbar.css'

const NavBar = () => {

    const { login, setLogin } = useContext(LoginContext)
    const { cart, setCart } = useContext(CartContext)
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const endSession = () => {
        setLogin("")
    }

    useEffect(() => {
        let totalPrice = 0;
        let qtd = 0;
        for (let i = 0; i < cart.length; i++) {
            totalPrice += cart[i].price * cart[i].quantity;
            qtd += cart[i].quantity
        }
        setQuantity(qtd)
        setTotal(totalPrice)
    }, [cart])

    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                <img src={logo} alt="Logo Nike Shoes" />
                <Link to="/" className='logo-title'>
                    <h2>Nike Shoes</h2>
                </Link>

            </div>
            <div className='navbar-links'>
                <ul className='navbar-list'>
                    <li>
                        <NavLink to="/" className='navbar-link'>
                            Home
                        </NavLink>
                    </li>
                    {login == 'true' &&
                        <li >
                            <NavLink to='/cart' className='navbar-cart'>
                                <div className='cart'>
                                    <img src={cartIcon} alt="Ícone carrinho de compras" />
                                    <p>{cart == undefined ? 0 : quantity} Itens</p>
                                    <p>R$ {cart == undefined ? Number(0).toFixed(2) : total.toFixed(2)}</p>
                                </div>
                            </NavLink>
                        </li>
                    }
                    {login != 'true' && <li><NavLink className='navbar-link' to="/login">Entrar</NavLink></li>}
                    {login != 'true' && <li><NavLink className='navbar-link' to="/register">Cadastrar</NavLink></li>}
                    {login == 'true' && <li><Link className='navbar-link' to="/" onClick={endSession}>Sair</Link> </li>}
                </ul>
            </div>

        </nav >
    )
}

export default NavBar