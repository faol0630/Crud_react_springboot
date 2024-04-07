import React, { useEffect, useState } from 'react'
import Navbar from './partials/Navbar'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const UpdateUser = () => {

    const { id } = useParams();
    const url_update_user = `http://localhost:8080/user1/update/${id}`;
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const navigator = useNavigate();

    //-----------------------------------------

    useEffect(() => {

        getUser(id);

    }, [id])

    const getUser = async (id) => {

        const url_get_user = `http://localhost:8080/user1/get_user/${id}`;
        
        const response = await axios.get(url_get_user)
        
        document.getElementById('name').value = response.data.user.name;
        document.getElementById('lastname').value = response.data.user.lastname;
        document.getElementById('email').value = response.data.user.email;
        document.getElementById('age').value = response.data.user.age;
        
        setName(response.data.user.name);
        setLastname(response.data.user.lastname);
        setEmail(response.data.user.email);
        setAge(parseInt(response.data.user.age));
        
    }
    //----------------------------------------------------
    
    
    const updateUser = async (event) => {
        
        event.preventDefault()

        const updatedUser = {
            name: name,
            lastname: lastname,
            email: email,
            age: parseInt(age)
        };

        try {

            const response = await axios.put(url_update_user, updatedUser)
            console.log(response)

            Swal.fire({
                icon: 'success',
                title: 'user updated',
                text: 'The user has been updated successfully'
            })

            // Clear form fields after submitting
            setName('');
            setLastname('');
            setEmail('');
            setAge('');

            navigator('/');


        } catch (error) {

            console.log(error)

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while updating the user'
            })
        }

    }

    return (
        <div className='container p-4'>

            <div className='row'>
                <div className='col text-center pt-3'>
                    <h1>Update User</h1>
                </div>
            </div>

            <div className='row'>
                <div className='col col-12 text-center'>
                    <Navbar />
                </div>
            </div>

            <div className='row'>
                <div className='col col-12 text-center'>

                    <div className="row text-center">

                        <div className="col col-12 col-lg-6 col-xl-4">

                            <form onSubmit={updateUser} id="user_form" className="text-bg-dark p-3 rounded">

                                <div className="my-3">
                                    <label htmlFor="name" className="form-label">Name:</label>
                                    <input onChange={(e) => setName(e.target.value)}  type="text" className="form-control form-control-lg text-bg-secondary" name="name" id="name" value={name} placeholder="Enter your name" />
                                </div>

                                <div className="my-3">
                                    <label htmlFor="lastname" className="form-label">Lastname:</label>
                                    <input onChange={(e) => setLastname(e.target.value)} type="text" className="form-control form-control-lg text-bg-secondary" name="lastname" id="lastname" value={lastname} placeholder="Enter your lastname" />
                                </div>

                                <div className="my-3">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control form-control-lg text-bg-secondary" name="email" id="email" value={email} placeholder="Enter your email" />
                                </div>

                                <div className="my-3">
                                    <label htmlFor="age" className="form-label">Age:</label>
                                    <input onChange={(e) => setAge(e.target.value)} type="text" className="form-control form-control-lg text-bg-secondary" name="age" id="age" value={age} placeholder="Enter your age" />
                                </div>

                                <button className="btn btn-lg btn-outline-dark" type="submit">Submit</button>

                            </form>
                        </div>
                    </div>





                </div>
            </div>
        </div>
    )
}

export default UpdateUser