import { ProductosContext } from './ProductosContext'
import { useEffect, useState } from "react"

export const ProductosProvider = ({ children }) => {

    const [productos, setProductos] = useState([])

    const fetchProductos = async (url) => {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        setProductos(data)
    }

    useEffect(() => {
        fetchProductos()
    }, [])

    return (
        <ProductosContext.Provider value={{ productos }}>
            {children}
        </ProductosContext.Provider>
    )
}
