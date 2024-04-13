import React from 'react'

const Navbar = () => {
  return (
        <div className="row pt-2">
            <div className="col col-12 text-center">
                <nav className="my-4">
                    <ul className="nav text-bg-dark p-3 rounded">
                        <li className="nav-item">
                            <a className="nav-link text-warning" href="/">User List</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link text-light" href="/new_user">New User</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link text-light" href="/swagger">Open Swagger UI</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link text-warning" href="/autos_list">Autos List</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link text-light" href="/new_auto">New Auto</a>
                        </li>

                    </ul>
                </nav>
            </div>
        </div>
  )
}

export default Navbar