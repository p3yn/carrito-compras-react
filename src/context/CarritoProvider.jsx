import { useReducer } from "react"
import { CarritoContext } from "./CarritoContext"

const initialState = []

export const CarritoProvider = ({ children }) => {

    const comprasReducer = (state = initialState, action = {}) => {
        switch (action.type) {
            case '[CARRITO] Agregar compra':
                return [...state, action.payload]
            case '[CARRITO] Aumentar cantidad compra':
                return state.map(compra => {
                    const cant = compra.cantidad + 1
                    if (compra.id === action.payload) return { ...compra, cantidad: cant }
                    return compra
                })
            case '[CARRITO] Disminuir cantidad compra':
                return state.map(compra => {
                    const cant = compra.cantidad - 1
                    if (compra.id === action.payload && compra.cantidad > 1) return { ...compra, cantidad: cant }
                    return compra
                })
            case '[CARRITO] Eliminar compra':
                return state.filter(compra => compra.id !== action.payload)
            default:
                return state
        }
    }

    const [listaCompras, dispatch] = useReducer(comprasReducer, initialState)

    const agregarCompra = (compra) => {
        compra.cantidad = 1
        const action = {
            type: '[CARRITO] Agregar compra',
            payload: compra
        }
        dispatch(action)
    }
    const aumentarCantidad = (id) => {
        const action = {
            type: '[CARRITO] Aumentar cantidad compra',
            payload: id
        }
        dispatch(action)

    }
    const disminuirCantidad = (id) => {
        const action = {
            type: '[CARRITO] Disminuir cantidad compra',
            payload: id
        }
        dispatch(action)

    }
    const eliminarCompra = (id) => {
        const action = {
            type: '[CARRITO] Eliminar compra',
            payload: id
        }
        dispatch(action)

    }

    return (
        <CarritoContext.Provider value={{ listaCompras, agregarCompra, aumentarCantidad, disminuirCantidad, eliminarCompra }}>
            {children}
        </CarritoContext.Provider>
    )
}
