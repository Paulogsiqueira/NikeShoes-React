import { addCart } from '@/redux/useSlicer'
import { useDispatch } from 'react-redux'
import { products } from '@/data/products.jsx';
import { useSelector } from 'react-redux'
import money from '@/img/icon/money.png';
import card from '@/img/icon/card.png';
import './ProductDetails.css'

const ProductDetails = ({ item, openModalFunc, openModalErrorFunc }) => {
  const user = useSelector(state => state.user)
  const login = user.isLogged
  const dispatch = useDispatch()

  const handleClick = () => {
    if (login == true) {
      openModalFunc()
      dispatch(addCart(products[item]))
    } else {
      openModalErrorFunc()
    }
  }

  return (
    <div className='product-details'>
      <div className='product-description'>
        <h2>{products[item].name}</h2>
        <h3>R$ {Number(products[item].price).toFixed(2)}</h3>
        <p><strong>Marca:</strong> Nike</p>
        <p><strong>Garantia:</strong> 12 meses</p>
        <p className='product-desc'>{products[item].description}</p>
      </div>
      <section className='payment'>
        <div >
          <div className='payment-cash'>
            <img src={money} alt="Ícone de dinheiro" />
            <p>R$ {Number(products[item].price * 0.9).toFixed(2)} <span>(no PIX )</span></p>
          </div>
          <div className='payment-card'>
            <img src={card} alt="Ícone de cartão de crédito" />
            <p>R$ {Number(products[item].price).toFixed(2)}</p>
          </div>
        </div>
        <button className='btn add-cart' onClick={handleClick}>Adicionar ao carrinho</button>
      </section>
      <section className="product-parcels">
        <h3>Parcelamento</h3>
        <ul>
          <li>1x R${products[item].price} <span>(sem juros)</span></li>
          <li>2x R${Number(products[item].price / 2).toFixed(2)} <span>(sem juros)</span></li>
          <li>3x R${Number(products[item].price / 3).toFixed(2)} <span>(sem juros)</span></li>
          <li>4x R${Number(products[item].price / 4).toFixed(2)} <span>(sem juros)</span></li>
          <li>5x R${Number(products[item].price / 5).toFixed(2)} <span>(sem juros)</span></li>
          <li>6x R${Number(products[item].price / 6).toFixed(2)} <span>(sem juros)</span></li>
          <li>7x R${Number(products[item].price / 7 * 1.04).toFixed(2)} <span>(4% de juros)</span></li>
          <li>8x R${Number(products[item].price / 8 * 1.08).toFixed(2)} <span>(8% de juros)</span></li>
          <li>9x R${Number(products[item].price / 9 * 1.12).toFixed(2)} <span>(12% de juros)</span></li>
          <li>10x R${Number(products[item].price / 10 * 1.16).toFixed(2)} <span>(16% de juros)</span></li>
        </ul>
      </section>
    </div>
  )
}

export default ProductDetails