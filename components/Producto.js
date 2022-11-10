import Image from 'next/image'
import { formatearDinero } from '../helpers'
import useQuiosco from '../hooks/useQuiosco'

const Producto = ({ producto }) => {

    const { handleSetProducto, handleChangeModal } = useQuiosco()
    const { nombre, imagen, precio } = producto

    return (
        <div className='border md:p-3'>
            <Image
                src={`/assets/img/${imagen}.jpg`}
                alt={'Imagen Platillo ${nombre}'}
                width={400}
                height={500}
            />

            <div className=' p-2 md:p-5 w-100'>
                <h3 className='text-1xl md:text-2xl font-bold'>{nombre}</h3>
                <p className='mt-5 font-black text-3xl md:text-4xl text-amber-500'>
                    {formatearDinero(precio)}
                </p>

                <button
                    type='button'
                    className='bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 
                    uppercase font-bold h-10'
                    onClick={() => {
                        handleChangeModal()
                        handleSetProducto(producto)
                    }}
                >
                    Agregar
                </button>

            </div>

        </div>
    )
}

export default Producto
