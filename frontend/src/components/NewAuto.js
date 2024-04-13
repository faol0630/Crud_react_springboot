import React, { useState } from 'react' //hooks
import Navbar from './partials/Navbar'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const NewAuto = () => {

    const url = 'http://localhost:8080/auto/new_auto';
    const [brand, setBrand] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const navigator = useNavigate();

    const setNewAuto = async (event) => {

        event.preventDefault()

        const newAuto = {
            brand: brand,
            year: year,
            price: price,
        }

        try {

            const response = await axios.post(url, newAuto)

            console.log(response)

            Swal.fire({
                icon: 'success',
                title: 'auto created',
                text: 'The auto has been created successfully'

            })

            // Clear form fields after submitting
            setBrand('');
            setYear('');
            setPrice('');

            navigator('/autos_list');

        } catch (error) {

            const validationErrors = error.response.data.validationErrors
            const errorMessages = Object.values(validationErrors)

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
                    New Auto
                </div>
            </div>

            <div className='row'>
                <div className='col col-12 text-center'>
                    <Navbar />
                </div>
            </div>

            <div className="row text-center">

                <div className="col col-12 col-lg-6 col-xl-4">

                    <form onSubmit={setNewAuto} id="auto_form" className="text-bg-dark p-3 rounded">

                        <div className="my-3">
                            <label htmlFor="brand" className="form-label">Brand:</label>
                            <input onChange={(e) => setBrand(e.target.value)} type="text" className="form-control form-control-lg text-bg-secondary" name="brand" id="brand" value={brand} placeholder="Brand" />
                        </div>

                        <div className="my-3">
                            <label htmlFor="year" className="form-label">Year:</label>
                            <input onChange={(e) => setYear(e.target.value)} type="text" className="form-control form-control-lg text-bg-secondary" name="year" id="year" value={year} placeholder="Year" />
                        </div>

                        <div className="my-3">
                            <label htmlFor="price" className="form-label">Price:</label>
                            <input onChange={(e) => setPrice(e.target.value)} type="text" className="form-control form-control-lg text-bg-secondary" name="price" id="price" value={price} placeholder="Price" />
                        </div>

                        <button className="btn btn-lg btn-outline-dark" type="submit">Submit</button>

                    </form>
                </div>
            </div>


        </div>
    )
}

export default NewAuto