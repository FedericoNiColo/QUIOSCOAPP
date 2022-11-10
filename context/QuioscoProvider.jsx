import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter()

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data)
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])


    const handleClickCategoria = id => {
        const categoriaAct = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoriaAct[0])
        router.push('/')
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = producto => {

        if (pedido.some(prod => prod.id === producto.id)) {
            const pedidoActualizado = pedido.map(product => product.id === producto.id ? producto : product)
            setPedido(pedidoActualizado)
            toast.success('Editando el pedido')
        } else {
            setPedido([...pedido, producto])
            toast.success('Agregando al pedido')
        }
    }

    const handleEliminarPedido = producto => {
        const pedidoActualizados = pedido.filter(product => product.id !== producto.id)
        setPedido(pedidoActualizados)
    }

    const colocarOrden = async e => {
        e.preventDefault()

        try {
            await axios.post('/api/ordenes', { pedido, nombre, total, fecha: Date.now().toString() })


            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre(' ')
            setTotal(0)

            toast.success('Pedido realizado correctamente')

            setTimeout(() => {
                router.push('/')
            }, 3000);

        } catch (error) {

        }
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                handleClickCategoria,
                categoriaActual,
                handleSetProducto,
                producto,
                handleChangeModal,
                modal,
                handleAgregarPedido,
                handleEliminarPedido,
                pedido,
                setNombre,
                nombre,
                colocarOrden,
                total

            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext