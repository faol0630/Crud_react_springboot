
document.addEventListener('DOMContentLoaded', () => {

    const formulario = document.getElementById('user_form');

    formulario.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        const formData = new FormData(formulario); // Obtener los datos del formulario

        // Realizar una petición POST al endpoint del backend
        fetch('/user1/new_user', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ocurrió un error al agregar el user.');
                }
                return response.text(); // Devuelve la respuesta del backend
            })
            .then(data => {

                alert("User created.OK")
                formulario.reset();
                window.location.href = "/_8_dinamic_table.html"
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
