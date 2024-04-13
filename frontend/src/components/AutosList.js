import React, { useEffect, useState } from 'react'
import Navbar from './partials/Navbar'
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const AutosList = () => {

    const url = "http://localhost:8080/auto/get_all";
    const [autosList, setAutosList] = useState([]);
    const navigator = useNavigate();
    // Modals:
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
    // Id to be passed as a parameter in the modal 
    const [selectedAutoId, setSelectedAutoId] = useState(null);

    // Loaded by default when the page is opened: 
    useEffect(() => {
        getAutos();
    }, [])

    const getAutos = async () => {
        const response = await axios.get(url)
        setAutosList(response.data.autosList)
    }

    const toUpdateAuto = async (id) => {

        const url_get_auto = `http://localhost:8080/auto/get_auto/${id}`;

        await axios.get(url_get_auto)

        navigator(`/get_auto/${id}`);
    }

    const handleDelete = async (id) => {

        const url_delete = `http://localhost:8080/auto/delete/${id}`;

        await axios.delete(url_delete)

        Swal.fire({
            icon: 'success',
            title: 'auto deleted',
            text: 'The auto has been deleted successfully'
        })

        // Close the modal
        setShowDeleteModal(false);
        // Update list after deleting
        getAutos();

    };

    const handleDeleteAll = async () => {

        const url_delete_all = 'http://localhost:8080/auto/delete_all';

        await axios.delete(url_delete_all)

        Swal.fire({
            icon: 'success',
            title: 'all autos deleted',
            text: 'All autos have been deleted successfully'
        })

        // Close the modal
        setShowDeleteAllModal(false);
        // Update list after deleting
        getAutos();

    }

    return (
        <div className='container-fluid p-4'>

            <div className='row'>
                <div className='col col-12 text-center pt-3'>
                    <h1>Autos List</h1>
                </div>
            </div>

            <div className='row'>
                <div className='col text-center'>
                    <Navbar />
                </div>
            </div>

            <div className="row pt-2">
                <div className="col col-12 col-lg-10 mx-auto">

                    <div className="table-responsive rounded">

                        <table className="table table-dark table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th className="py-2">ID</th>
                                    <th className="py-2">Brand</th>
                                    <th className="py-2">Year</th>
                                    <th className="py-2">Price</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {
                                    autosList ? (

                                        autosList.map((auto, i) => (
                                            <tr key={auto.idAuto}>
                                                <td>{auto.idAuto}</td>
                                                <td>{auto.brand}</td>
                                                <td>{auto.year}</td>
                                                <td>{auto.price}</td>
                                                <td className='text-center py-2'>
                                                    <button onClick={() => toUpdateAuto(auto.idAuto)} className='btn btn-warning mx-4'>
                                                        <i className='fa-solid fa-edit'></i>
                                                    </button>
                                                    <button onClick={() => {
                                                        setShowDeleteModal(true)
                                                            ; setSelectedAutoId(auto.idAuto)
                                                    }
                                                    } className='btn btn-danger'>

                                                        <i className='fa-solid fa-trash'></i>
                                                    </button>

                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className='text-center' colSpan="5">No hay autos disponibles</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            {/* MODAL DELETE ONE ---------------------------- */}

            <div>

                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>

                    <Modal.Header>
                        <Modal.Title>Delete Auto</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Are you sure to delete this auto?</Modal.Body>

                    <Modal.Footer >
                        <button onClick={() => handleDelete(selectedAutoId)} className='btn btn-danger'>Yes, delete</button>
                        <button onClick={() => setShowDeleteModal(false)} className='btn btn-secondary'>No, cancel</button>
                    </Modal.Footer>
                </Modal>

            </div>

            <div className="row">
                <div className="col text-center">
                    <button onClick={() => setShowDeleteAllModal(true)} className="btn btn-lg btn-danger" id="delete_all">Delete All</button>
                </div>
            </div>

            {/* MODAL DELETE ALL ---------------------------- */}

            <div>

                <Modal show={showDeleteAllModal} onHide={() => setShowDeleteAllModal(false)}>

                    <Modal.Header>
                        <Modal.Title>Delete All</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Are you sure to delete all items?</Modal.Body>

                    <Modal.Footer>
                        <button onClick={() => handleDeleteAll()} className='btn btn-danger'>Yes, delete all</button>
                        <button onClick={() => setShowDeleteAllModal(false)} className='btn btn-secondary'>No, cancel</button>
                    </Modal.Footer>

                </Modal>

            </div>


        </div>
    )
}

export default AutosList