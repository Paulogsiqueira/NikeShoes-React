import { products } from '@/data/products.jsx';
import { useEffect, useState } from 'react';
import fallBackImage from '@/img/icon/no-image.png'
import teste from '@/img/icon/teste.png';
import './ProductImg.css'

const ProductImg = ({item}) => {
    const [mainImg, setMainImg] = useState(products[item].img)
    const [magnifyStyle, setMagnifyStyle] = useState({ backgroundImage: `url('${mainImg}')` })
    const [showImg, setShowImg] = useState(mainImg)

    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    
      useEffect(() => {
        const handleResize = () => {
          setWindowDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        };
    
        window.addEventListener('resize', handleResize);
        if(windowDimensions.width < 1024){
            setShowImg(mainImg)
            setMagnifyStyle((prev) => ({...prev,display:'none'}))
        }
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [window.innerWidth]);

    const handleMouseMove = (e) => {
        const { offsetX, offsetY, target } = e.nativeEvent;
        const { offsetWidth, offsetHeight } = target;
        const xPercentage = (offsetX / offsetWidth) * 100;
        const yPercentage = (offsetY / offsetHeight) * 100;
        
        if(windowDimensions.width < 1024){
            setMagnifyStyle((prev) => ({...prev,display:'none'}))
            setShowImg(mainImg)
        }else{
            setShowImg(teste)
            setMagnifyStyle((prev) => ({ ...prev,display:'block',top:`${offsetY +100}px`,left:`${offsetX+100 }px`, backgroundPosition: `${xPercentage}% ${yPercentage}%` }))
        }
    }

    useEffect(() => {
        setMagnifyStyle((prev) => ({...prev,backgroundImage: `url('${mainImg}')` }))
        setShowImg(mainImg)
     }, [mainImg])

    const handleMouseLeave = (e) => {
        setShowImg(mainImg)
        setMagnifyStyle((prev) => ({...prev,display:'none'}))
    }
    return (
        <div className='product-img'>
            <div className='product-gallery'>
                <ul>
                    <li>
                        <img draggable={false} src={products[item].img} onClick={() => setMainImg(products[item].img)} alt="Imagem do modelo selecionado" onError={(e) => { e.target.onerror = null; e.target.src=fallBackImage; }}/>
                    </li>
                    {products[item].othersImg.map((image, index) => (
                        <li key={index}>
                            <img src={image} draggable={false} onClick={() => setMainImg(image)} alt="Posições diferentes do modelo selecionado" onError={(e) => { e.target.onerror = null; e.target.src=fallBackImage; }}/>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='main-img'>
                <img className="product-img__main" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} draggable={false} src={showImg} alt="Imagem do modelo selecionado" onError={(e) => { e.target.onerror = null; e.target.src=fallBackImage; }} />
                <div className='magnify' style={magnifyStyle}></div>
            </div>
        </div>
    )
}

export default ProductImg