import { useContext } from 'react'
import { CarritoContext } from '../context/CarritoContext'

export const CarritoScreen = () => {

  const { listaCompras, aumentarCantidad, disminuirCantidad, eliminarCompra } = useContext(CarritoContext)

  const CalcularTotal = () => {
    return listaCompras.reduce((total, compra) => total + compra.price * compra.cantidad, 0).toFixed(2)
  }

  const handleImpresion = () => {
    print()
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {listaCompras.map(compra => (
            <tr key={compra.id}>
              <th>{compra.title}</th>
              <td>{compra.price}</td>
              <td>
                <button className='btn btn-outline-primary' onClick={() => disminuirCantidad(compra.id)}>➖</button>
                <button className='btn btn-primary'>{compra.cantidad}</button>
                <button className='btn btn-outline-primary' onClick={() => aumentarCantidad(compra.id)}>➕</button>
              </td>
              <td>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={() => eliminarCompra(compra.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          <th><b>TOTAL: </b></th>
          <td></td>
          <td></td>
          <td>${CalcularTotal()}</td>

        </tbody>
      </table>
      <div className="d-grid gap-2">
        <button
          className="btn btn-primary"
          onClick={handleImpresion}
          disabled={listaCompras < 1}
        >PAGAR</button>
      </div>
    </>
  )
}
