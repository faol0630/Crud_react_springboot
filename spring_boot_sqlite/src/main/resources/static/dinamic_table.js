

//User's Table
fetch('/user1/get_all')
    .then(response => response.json())
    .then(result => {
        //result es el hashmap que envio desde spring boot
        const tablaUsers = document.getElementById('tabla-users');
        //usersList es el key que va con el value usersList
        result.usersList.forEach(user => {

            const fila = document.createElement('tr');
            fila.classList.add('bg-dark')

            const id = document.createElement('td');
            id.textContent = user.id;

            const name = document.createElement('td');
            name.textContent = user.name;

            const lastname = document.createElement('td');
            lastname.textContent = user.lastname;

            const age = document.createElement('td');
            age.textContent = user.age;

            const email = document.createElement('td');
            email.textContent = user.email;

            const actions = document.createElement('td')
            //actions.classList.add('bg-dark', 'text-center')

            const updateBtn = document.createElement('button')
            updateBtn.textContent = "Update";
            updateBtn.classList.add('btn', 'btn-warning', 'mx-4', 'my-2');
            updateBtn.addEventListener('click', () => updateUser(fila))

            const deleteBtn = document.createElement('button')
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add('btn', 'btn-danger', 'mx-4', 'my-2')
            deleteBtn.addEventListener('click', () => deleteUser(user))

            actions.appendChild(updateBtn)
            actions.appendChild(deleteBtn)

            fila.appendChild(id);
            fila.appendChild(name);
            fila.appendChild(lastname);
            fila.appendChild(age);
            fila.appendChild(email);
            fila.appendChild(updateBtn);
            fila.appendChild(deleteBtn);

            tablaUsers.appendChild(fila);
        });
    })
    .catch(error => {
        console.error('Error with users list:', error);
    });

//Button Delete All
document.getElementById('delete_all').addEventListener('click', () => deleteAll());

function deleteAll() {

    var ok = confirm("Seguro de eliminar todos los users?")

    if (ok) {

        fetch('/user1/delete_all', { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Users list deleted') {
                    // Si la lista de usuarios se eliminó correctamente, actualiza la tabla
                    document.getElementById('tabla-users').innerHTML = ''; // Elimina todas las filas de la tabla
                    console.log('Todas las tuplas eliminadas');
                } else {
                    console.error('Error al eliminar las tuplas:', data.message);
                }
            })
            .catch(error => {
                console.error('Error al realizar la solicitud:', error);
            });
    }

}

function deleteUser(user) {

    var ok = confirm("Seguro de eliminar user?")

    if (ok) {

        fetch(`/user1/delete/${user.id}`, { method: 'DELETE' })
            .then(response => {

                if (response.message === "User deleted") {
                    // Actualizar la tabla si la eliminación fue exitosa
                    fila.remove();


                } else {
                    console.error('Error deleting user:', response.statusText);
                }

            })
            .then(response => {
                // Eliminación exitosa, recargar la página
                alert("User deleted.OK")
                window.location.href = "./_8_dinamic_table.html";
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }

}

function updateUser(fila) {

    // Obtener la fila correspondiente al botón presionado
    // Obtener los valores de la fila

    const id = fila.cells[0].textContent;
    const name = fila.cells[1].textContent;
    const lastname = fila.cells[2].textContent;
    const age = fila.cells[3].textContent;
    const email = fila.cells[4].textContent;

    // Construir la URL del formulario de actualización con los parámetros
    const url = `/update_user.html?id=${id}&name=${name}&lastname=${lastname}&email=${email}&age=${age}`;
    // Redireccionar a la página del formulario de actualización
    window.location.href = url;

}

