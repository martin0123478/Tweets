//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
var tweets = [];

//EventListeners
EventListeners()
function EventListeners(){
    formulario.addEventListener('submit', agregarTweet)
    //cuando el documento este listo
    document.addEventListener('DOMContentLoaded',()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets)
        crearHTML()
    })
}

//Funciones

function agregarTweet(e){
    e.preventDefault()
    //Textarea
    const tweet = document.querySelector('#tweet').value;
    
    //Validación
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio')
        return
    }
    const tweetObj = {
        id: Date.now(),
       tweet
    }
   //Añadir al arreglo
   tweets = [...tweets,tweetObj];
   
   //Una vez agregado crear HTML
   crearHTML()
   //reiniciar formulario
   formulario.reset()
}

function mostrarError(error){
    const mensaje = document.createElement('p');
    mensaje.textContent = error;
    mensaje.classList.add('error');

    //Insertatrlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove()
    }, 3000);
}

//muestra listadp
function crearHTML(){
    limpiarHTML()
    if(tweets.length > 0){
        tweets.forEach(tweet =>{
            //Agregar boton de eliminar
            const btn = document.createElement('a')
            btn.classList.add('borrar-tweet')
            btn.innerText = 'X'
            btn.onclick =   ()=>{
                borrarTweet(tweet.id)
            }
            //crear html
            const li = document.createElement('li')
            li.textContent = tweet.tweet
            //asignar bitin
            li.appendChild(btn)
            //insertar
            listaTweets.appendChild(li)
        })
    }
    sincronizarStorage()
}


//Limpiar html
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}
//agrega tweets a localStorage
function  sincronizarStorage(){
    //cuando usuari grega nuevo tweet
    localStorage.setItem('tweets',JSON.stringify(tweets))

    
}
//eliminar tweet
function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id)
    crearHTML()
}