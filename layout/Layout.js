import Head from 'next/head'
import Modal from 'react-modal'
import Sidebar from '../components/Sidebar'
import ModalProducto from '../components/ModalProducto';
import useQuiosco from '../hooks/useQuiosco';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Pasos from '../components/Pasos';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#__next');

export default function Layout({ pagina, children }) {

    const { modal } = useQuiosco()

    return (
        <>
            <Head>
                <title>Fresh Coffee - {pagina}</title>
                <meta name='description' content='Quiosco Caferería' />
            </Head>


            <div className='md:flex'>
                <aside className='md:w-4/12 xl:w-1/4 2xl:w1/5'>
                    <Sidebar />
                </aside>

                <main className='md:w-8/12 xl:w-3/4 2xl:w4/5 h-screen overflow-y-scroll'>
                    <div className=' p-2 md:p-10'>
                        <Pasos /> 
                        {children}
                    </div>
                </main>
            </div>

            {modal && (
                <Modal
                    isOpen={modal}
                    style={customStyles}
                >
                    <ModalProducto />
                </Modal>
            )}

            <ToastContainer autoClose={2000} />

        </>
    )
}
