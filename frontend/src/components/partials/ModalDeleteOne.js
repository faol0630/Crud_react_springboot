import React, { useState } from 'react'
import axios from 'axios'

const ModalDeleteOne = () => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    


    return (

        <div>

            

            {/* // Tu contenido principal */}

            <button onClick={() => setShowDeleteModal(true)}>Eliminar elemento</button>
        </div>

    )
}

export default ModalDeleteOne