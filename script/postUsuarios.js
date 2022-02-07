let formulario = document.getElementById('formulario')
let btnCorreo = document.getElementById('btnCorreo')
let btnEditar = document.getElementById('btnEditar')
let btnEliminar = document.getElementById('btnEliminar')

window.addEventListener('DOMContentLoaded', ()=> {
    document.getElementById('id').style.display = 'none';
    document.getElementById('label-edit').style.display = 'none'
})

formulario.addEventListener('submit', (e)=> {
    e.preventDefault()

    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;

    fetch('http://localhost:4002/usuarios', {
        method: 'POST',
        body: JSON.stringify({
            nombre: name,
            apellido: lastName,
            correo: email
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    }).then((resp)=> console.log(resp))
})