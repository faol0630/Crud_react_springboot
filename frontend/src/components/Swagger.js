

import Navbar from './partials/Navbar'

const Swagger = () => {


    return (

        <div className='container-fluid p-4'>
            <div className='row'>
                <div className='col col-12 text-center'>
                    <Navbar />
                </div>
            </div>

            <div>
                <iframe src="http://localhost:8080/swagger-ui.html" style={{ width: '100%', height: '600px', border: 'none' }} title="Swagger UI"></iframe>
            </div>
        </div>

    )
}

export default Swagger