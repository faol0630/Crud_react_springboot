
import React, { useEffect, useState } from 'react' //hooks
import axios from 'axios'
import Navbar from './partials/Navbar'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2'


const UserList = () => {

    const url = 'http://localhost:8080/user1/get_all';
    const [usersList, setUsersList] = useState([]);
    const navigator = useNavigate();
    // Modals:
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
    // Id to be passed as a parameter in the modal 
    const [selectedUserId, setSelectedUserId] = useState(null);

    // Loaded by default when the page is opened: 
    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        const response = await axios.get(url)
        setUsersList(response.data.usersList)
    }

    const toUpdateUser = async (id) => {

        const url_get_user = `http://localhost:8080/user1/get_user/${id}`;

        await axios.get(url_get_user)

        navigator(`/get_user/${id}`);
    }

    const handleDelete = async (id) => {


        const url_delete = `http://localhost:8080/user1/delete/${id}`;

        await axios.delete(url_delete)

        Swal.fire({
            icon: 'success',
            title: 'user deleted',
            text: 'The user has been deleted successfully'
        })

        // Close the modal
        setShowDeleteModal(false);
        // Update list after deleting
        getUsers();

    };

    const handleDeleteAll = async() => {

        const url_delete_all = 'http://localhost:8080/user1/delete_all';

        await axios.delete(url_delete_all)

        Swal.fire({
            icon: 'success',
            title: 'all users deleted',
            text: 'All users have been deleted successfully'
        })

        // Close the modal
        setShowDeleteAllModal(false);
        // Update list after deleting
        getUsers();

    }


    return (
        <div className='container-fluid p-4'>

            <div className='row'>
                <div className='col col-12 text-center pt-3'>
                    <h1>User List</h1>
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
                                    <th className="py-2">Name</th>
                                    <th className="py-2">Lastname</th>
                                    <th className="py-2">Email</th>
                                    <th className="py-2">Age</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {
                                    usersList ? (

                                        usersList.map((user, i) => (
                                            <tr key={user.id}>
                                                <td id='id_value'>{(user.id)}</td>
                                                <td id='name_value'>{user.name}</td>
                                                <td id='lastname_value'>{user.lastname}</td>
                                                <td id='email_value'>{user.email}</td>
                                                <td id='age_value'>{user.age}</td>
                                                <td id='actions_value' className='text-center py-2'>
                                                    <button onClick={() => toUpdateUser(user.id)} className='btn btn-warning mx-4'>
                                                        <i className='fa-solid fa-edit'></i>
                                                    </button>
                                                    <button onClick={() => {
                                                        setShowDeleteModal(true)
                                                        ; setSelectedUserId(user.id)
                                                    }
                                                    } className='btn btn-danger'>

                                                        <i className='fa-solid fa-trash'></i>
                                                    </button>

                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className='text-center' colSpan="6">No hay usuarios disponibles</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <div className="row">
                <div className="col text-center">
                    <button onClick={() => setShowDeleteAllModal(true)} className="btn btn-lg btn-danger" id="delete_all">Delete All</button>
                </div>
            </div>

            {/* MODAL DELETE ONE ---------------------------- */}

            <div>

                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>

                    <Modal.Header>
                        <Modal.Title>Delete User</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Are you sure you want to delete this item?</Modal.Body>

                    <Modal.Footer >
                        <button onClick={() => handleDelete(selectedUserId)} className='btn btn-danger'>Yes, delete</button>
                        <button onClick={() => setShowDeleteModal(false)} className='btn btn-secondary'>No, cancel</button>
                    </Modal.Footer>
                </Modal>

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

export default UserList