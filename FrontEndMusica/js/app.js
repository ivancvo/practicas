// llamar los formularios

const registroForm = document.getElementById('registroForm');
const loginForm = document.getElementById('loginForm');

//mostrar un mensaje de error
function mostrarError (mensaje){
    alert(mensaje);
}

//validar correo electronico 

function validarEmail(email){
    const regex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// controla el submit para el registro

registroForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email =document.getElementById('email').value;

    const password = document.getElementById('password').value;

    //validacion
    if (!nombre || !email || !password){
        mostrarError('complete todos los campos mon ami');
        return;
    }
    if(!validarEmail(email)){
        mostrarError('por favor, ingrese un correo electronico valido mon ami');
        return;
    }
    if (password.length < 8) {
        mostrarError('La contraseña debe tener al menos 8 caracteres');
        return;
      }

    //creamos un objeto para guardar los datos del usuario
    const usuario = {nombre, email, password};

    //guardar el usuario en el localstorage
    const usuarios =JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    //mensaje de pass y redirigir al incio de ession
    alert('usuario registrado correctamente');
    window.location.href = 'index.html';
});




// controla el submit para el inicio de sesion 
loginForm.addEventListener('submit', (event)=> {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    //llamar los usuarios guardados
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // busca el usuario en el arreglo (array)
    const usuarioEncontrado = usuarios.find(usuario => usuario.email === email && usuario.password === password);

    if (usuarioEncontrado) {
        //mensaje de inicio de sesion correcto
        alert('has iniciado sesion correctamente');   
    } else {
        mostrarError('usuario o contraseña incorrectos');
    }
});



// el guardar en el localstorage simula una base de datos simple

// ... (resto de tu código)

const form = document.getElementById('formSubirCancion');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtener los valores del formulario
    const titulo = document.getElementById('titulo').value;
    const interprete = document.getElementById('interprete').value;
    const minutos = document.getElementById('minutos').value;
    const segundos = document.getElementById('segundos').value;

    // Validación básica (puedes agregar más validaciones si lo deseas)
    if (!titulo || !interprete || !minutos || !segundos) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Crear el objeto de la nueva canción
    const nuevaCancion = {
        titulo,
        interprete,
        duracion: `${minutos}:${segundos}`
    };

    // Agregar la nueva canción a la lista y actualizar el localStorage
    const canciones = JSON.parse(localStorage.getItem('canciones')) || [];
    canciones.push(nuevaCancion);
    localStorage.setItem('canciones', JSON.stringify(canciones));

    // Mostrar una notificación de éxito utilizando SweetAlert2
    Swal.fire({
        icon: 'success',
        title: '¡Canción agregada!',
        text: 'La canción se ha agregado a tu lista.'
    }).then(() => {
        // Limpiar los campos del formulario
        document.getElementById('titulo').value = '';
        document.getElementById('interprete').value = '';
        document.getElementById('minutos').value = '';
        document.getElementById('segundos').value = '';

        // Actualizar la lista de canciones en la interfaz
        mostrarCanciones();
    });
});