import React, { useEffect, useState } from 'react'
import Navbar from './partials/Navbar'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const UpdateAuto = () => {


    const { id } = useParams();
    const url_update_auto = `http://localhost:8080/auto/update/${id}`;
    const [brand, setBrand] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const navigator = useNavigate();

    //-----------------------------------------

    useEffect(() => {

        getAuto(id);

    }, [id])

    const getAuto = async (id) => {

        const url_get_auto = `http://localhost:8080/auto/get_auto/${id}`;

        const response = await axios.get(url_get_auto)

        document.getElementById('brand').value = response.data.auto.brand;
        document.getElementById('year').value = response.data.auto.year;
        document.getElementById('price').value = response.data.auto.price;

        setBrand(response.data.auto.brand);
        setYear(response.data.auto.year);
        setPrice(response.data.auto.price);


    }
    //----------------------------------------------------

    const updateAuto = async (event) => {
        
        event.preventDefault()

        const updatedAuto = {
            brand: brand,
            year: year,
            price: price,
        };

        try {

            const response = await axios.put(url_update_auto, updatedAuto)
            console.log(response)

            Swal.fire({
                icon: 'success',
                title: 'auto updated',
                text: 'The auto has been updated successfully'
            })

            // Clear form fields after submitting
            setBrand('');
            setYear('');
            setPrice('');

            navigator('/autos_list');


        } catch (error) {

            console.log(error)

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while updating the auto'
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

                            <form onSubmit={updateAuto} id="user_form" className="text-bg-dark p-3 rounded">

                                <div className="my-3">
                                    <label htmlFor="brand" className="form-label">Brand:</label>
                                    <input onChange={(e) => setBrand(e.target.value)}  type="text" className="form-control form-control-lg text-bg-secondary" name="brand" id="brand" value={brand} placeholder="Brand" />
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
            </div>

        </div>

    )
}

export default UpdateAuto