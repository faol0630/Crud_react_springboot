

//cargar la info cuando se abre la pagina:
document.addEventListener('DOMContentLoaded', () => {
    // Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    // Obtener los valores de los parámetros
    const id = urlParams.get('id');
    const name = urlParams.get('name');
    const lastname = urlParams.get('lastname');
    const email = urlParams.get('email');
    const age = urlParams.get('age');

    // Asignar los valores a los campos del formulario
    document.getElementById('name').value = name;
    document.getElementById('lastname').value = lastname;
    document.getElementById('email').value = email;
    document.getElementById('age').value = age;

    const formulario = document.getElementById('update_user_form');

    formulario.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        const formData = new FormData(formulario); // Obtener los datos del formulario

        // Realizar una petición POST al endpoint del backend
        fetch(`/user1/update/${id}`, {
            method: 'PUT',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ocurrió un error al actualizar el user.');
                }
                return response.text(); // Devuelve la respuesta del backend
            })
            .then(data => {

                alert("User updated.OK")
                formulario.reset();
                window.location.href = "_8_dinamic_table.html"
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

});
