import { useEffect, useState } from 'react';
import Modal from 'react-modal';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex : 1
    },
};
Modal.setAppElement('#root');
const ModalGrande = ({className, children, Componente, funcionAdicionalSet, ...props})=>{
    const [showConfirm, setShowConfirm] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = ()=>{
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }

    return(
        <div>
            <button onClick={openModal} className={className}>
                {children}
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Componente cerrar={closeModal} funcionAdicionalSet={funcionAdicionalSet} {...props}/>
            </Modal>
        </div>
    )
}
export default ModalGrande;