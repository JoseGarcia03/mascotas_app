let formulario = document.getElementById('formulario')

window.addEventListener('DOMContentLoaded', ()=> {
    document.getElementById('id').style.display = 'none';
    document.getElementById('label-edit').style.display = 'none'
})

formulario.addEventListener('submit', (e)=> {
    e.preventDefault()

    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;

    fetch('http://localhost:4003/usuarios', {
        method: 'POST',
        body: JSON.stringify({
            nombre: name,
            apellido: lastName,
            correo: email
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    }).then(()=> Swal.fire({
        title: 'Registrado Correctamente',
        showConfirmButton: false,
        timer: 1000
    }))
})