import { FreightContext } from '../../../context/FreightContext';
import { CartContext } from '../../../context/CartContext';
import { OrderDetailsContext } from '../../../context/OrderDetailsContext';
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import close from '../../../img/icon/close.png';
import error from '../../../img/icon/error.png';
import pix from '../../../img/payment/pix.png'
import './Pix.css'

const Pix = () => {
    const { freight, setFreight } = useContext(FreightContext)
    const { cart, setCart } = useContext(CartContext)
    const { orderDetails, setOrderDetails } = useContext(OrderDetailsContext)
    const [modalErrorIsOpen, setModalErrorIsOpen] = useState(false)
    const [total, setTotal] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        let totalPrice = 0;
        for (let i = 0; i < cart.length; i++) {
            totalPrice += cart[i].price * cart[i].quantity;
        }
        setTotal(totalPrice)
    }, []);

    const handlePayment = () => {
        setCart([])
        setFreight(0)
        setOrderDetails(false)
        openModalError()
    }

    const openModalError = () => {
        setModalErrorIsOpen(true)
    }

    const closeModal = () => {
        setModalErrorIsOpen(false)

    }

    return (
        <div>
            <div className="payment-pix">
                <div className='pix-img'>
                    <img src={pix} alt="Código pix" />
                </div>
                <div>
                    <h2>Valor: R${((total + freight) * 0.9).toFixed(2)}</h2>
                </div>
                <div className='pix-data'>
                    <h3>Dados para PIX manual</h3>
                    <p><strong>Nome:</strong> Paulo Gustavo Siqueira</p>
                    <p><strong>CNPJ:</strong> 94.688.382/0001-31</p>
                    <p><strong>Banco:</strong> Bradesco S.A</p>
                    <p><strong>Agência:</strong> 1799</p>
                    <p><strong>Conta: </strong>5703 4128 1759 2321</p>
                </div>
                <p>Após realizar o pagamento, clique no botão abaixo</p>
                <button className='btn-pix' onClick={() => handlePayment()}>Pagamento realizado!</button>
            </div>
            <Modal
                isOpen={modalErrorIsOpen}
                onRequestClose={closeModal}
                className='modal-content'>
                <div className='modal'>
                    <div className='modal-close'>
                        <button onClick={() => { closeModal() }}><img src={close} /></button>
                    </div>
                    <div className='modalError-title'>
                        <img src={error} />
                        <p>Agredecemos pela preferência</p>
                        <p>Assim que for o pedido for aprovado você será notificado por e-mail</p>
                    </div>
                    <div className='modal-btn'>
                        <button onClick={() => closeModal()} className='modal-btn__cart'>OK</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Pix