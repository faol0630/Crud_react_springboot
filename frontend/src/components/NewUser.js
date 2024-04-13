
import React, { useState } from 'react' //hooks
import Navbar from './partials/Navbar'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


const NewUser = () => {

    const url = 'http://localhost:8080/user1/new_user';
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [auto, setAuto] = useState('');
    const [autosList, setAutosList] = useState([]);
    const navigator = useNavigate();

    //-----------------------------------------

    useEffect(() => {
        getAllAutos();
    }, [])

    const getAllAutos = async () => {

        const url = "http://localhost:8080/auto/get_all";
        const response = await axios.get(url)
        setAutosList(response.data.autosList)

    }

    //-----------------------------------------

    const setNewUser = async (event) => {

        event.preventDefault()

        const newUser1 = {
            name: name,
            lastname: lastname,
            email: email,
            age: parseInt(age),
            auto: {
                idAuto: parseInt(auto) 
            }
        }

        try {

            const response = await axios.post(url, newUser1)

            console.log(response)

            Swal.fire({
                icon: 'success',
                title: 'user created',
                text: 'The user has been created successfully'

            })

            // Clear form fields after submitting
            setName('');
            setLastname('');
            setEmail('');
            setAge('');
            setAuto('');

            navigator('/');

        } catch (error) {

            const validationErrors = error.response.data.validationErrors
            const errorMessages = validationErrors ? Object.values(validationErrors) : [];

            console.log(error)

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessages.join('\n')

            })

        }

    }

    return (
        <div className="container p-4">

            <div className="row">
                <div className="col text-center pt-3">
                    New User
                </div>
            </div>

            <div className='row'>
                <div className='col col-12 text-center'>
                    <Navbar />
                </div>
            </div>

            <div className="row text-center">

                <div className="col col-12 col-lg-6 col-xl-4">

                    <form onSubmit={setNewUser} id="user_form" className="text-bg-dark p-3 rounded">

                        <div className="my-3">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input onChange={(e) => setName(e.target.value)} type="text" className="form-control form-control-lg text-bg-secondary" name="name" id="name" value={name} placeholder="Enter your name" />
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

                        <div className="my-3">

                            <label htmlFor="auto" className="form-label">Auto:</label>

                            <select onChange={(e) => setAuto(e.target.value)} className="form-control form-control-lg text-bg-secondary" name="auto" id="auto">
                                <option value="">Select an auto</option>
                                {
                                    autosList.map((auto) => (
                                        <option key={auto.idAuto} value={auto.idAuto}>{auto.idAuto + " / " + auto.brand}</option>
                                    ))
                                }
                            </select>


                        </div>

                        <button className="btn btn-lg btn-outline-dark" type="submit">Submit</button>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default NewUser