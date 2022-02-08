// Capturamos el boton de buscar
const btnCorreo = document.getElementById('btnCorreo')

// Variable que tendra la info del usuario que busquen
let usr = [];

// Escuchamos el click en el boton de buscar por correo
btnCorreo.addEventListener('click', ()=> {
    // capturamos el email que puso en el input
    const usrEmail = document.getElementById('email').value;
    // Llamamos a la funcion que buscar el usuario
    searchUrs(usrEmail)
})

// Funcion asincronica para buscar el usuario
async function searchUrs(email) {
    // Hacemos una peticion a la URL
    const resp = await fetch('http://localhost:4003/usuarios')
    const data = await resp.json()
    // Realizamos la busqueda a ver si existe un usuario con ese email
    usr = data.filter((usuario)=> usuario.correo.toLowerCase() === email.toLowerCase())

    // Si el resultado de la busqueda es diferente a un array vacio
    if(usr.length !== 0){
        // Capturamos los campos para rellenar con los datos y los modificamos
        document.getElementById('name').value = usr[0].nombre;
        document.getElementById('lastName').value = usr[0].apellido;
        document.getElementById('email').value = usr[0].correo;
        // Si no
    }else{
        // Mandamos una alerta que diga que el correo no existe
        Swal.fire({
            title: 'Correo no existe',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        })
    }
}

// Capuramos el boton de editar
const btnEditar = document.getElementById('btnEditar')

// funcion para el metodo PUT
btnEditar.addEventListener('click', async ()=> {
    // Validamos si realmente hay un usuario para editar
    if (usr.length !== 0 ) {
        // Sacamos el id
        const { id } = usr[0]
        // Capturamos nuevamente los input con la info modificada
        const lastName = document.getElementById('lastName').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        // Enviamos el PUT a la API
        await fetch(`http://localhost:4003/usuarios/${id}`,{
            method: 'PUT',
            body: JSON.stringify({
                nombre: name,
                apellido: lastName,
                correo: email
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then(()=> Swal.fire({
            title: 'Datos Actualizados',
            showConfirmButton: false
        }))
    }else{
        // Mostramos una alerta que indique que primero debe buscar
        Swal.fire({
            title: 'Primero busque un usuario por correo',
            icon: 'info'
        })
    }
})

// Borrar
document.getElementById('btnEliminar').addEventListener('click', async ()=> {
    if(usr.length !== 0){
        // Sacamos el id
        const { id } = usr[0]
        // Hacemos la peticion de borrar
        await fetch(`http://localhost:4003/usuarios/${id}`, {method: 'DELETE'})
    }else{
        // Mostramos una alerta que indique que primero debe buscar
        Swal.fire({
            title: 'Primero busque un usuario por correo',
            icon: 'info'
        })
    }
})