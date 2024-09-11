const div = document.getElementById('items');
const botonE = document.getElementById('espBoton');
const botonG = document.getElementById('genBoton');
const especieBox = document.getElementById('opcionesEspecie');
const generoBox = document.getElementById('opcionesGenero');
const barra = document.getElementById('barra');
botonE.addEventListener('click',filtradoPorEspecie);
botonG.addEventListener('click',filtradoPorGenero);

(async()=>{
    const pjs = await peticion()
    cargarSelect(pjs)
    cargarPagina(pjs)
})()

async function reset(){
    eliminarCards()
    const pjs = await peticion()
    console.log("reset inicio")
    cargarPagina(pjs)
    console.log("reset fin")
}

function cargarPagina(personajes){
    try {
        const arrayPersonajes = personajes 
        
        console.log(arrayPersonajes)
    
        arrayPersonajes.forEach(pj => {
        let card = document.createElement('div')
        card.className = 'card'
    
        let nombre = document.createElement('h3')
        nombre.textContent = pj.name
        let casa = document.createElement('h5')
        casa.textContent = pj.house
                
        let foto = document.createElement('img')
        pj.image === "" ? foto.src = 'https://i0.wp.com/www.gamerfocus.co/wp-content/uploads/2015/06/Sombrero-seleccionador.jpg?fit=612%2C344&ssl=1'
        : foto.src = pj.image
    
        if(pj.alive == false){
            const equis = document.createElement('div')
            equis.className = 'equis'
            equis.textContent = '✖'
            card.appendChild(equis)
        }    

        card.appendChild(nombre)
        card.appendChild(casa)
        card.appendChild(foto)
        div.appendChild(card)
        }); 
    } catch (error) {
        let text = document.createElement('p')
        text.className = 'errorMensaje'
        text.textContent = error.message
        div.appendChild(text)
    }
    


}

function cargarSelect(pjs){

    const especies = pjs.reduce((acumulador,pj)=>{
        acumulador.add(pj.species) 
        return acumulador
    },new Set())
    const generos = pjs.reduce((acumulador,pj)=>{
        acumulador.add(pj.gender) 
        return acumulador
    },new Set())
    
    especies.forEach(especie=>{
        let opcion = document.createElement('option')
        opcion.value = 'opcionesEspecie'
        opcion.textContent = especie
        especieBox.appendChild(opcion)
    })
    generos.forEach(gen=>{
        let opcion = document.createElement('option')
        opcion.value = 'opcionesGenero'
        gen=="" ? opcion.textContent = 'no definido' : opcion.textContent = gen
        generoBox.appendChild(opcion)
    })
}

async function filtradoPorEspecie(){
    let t = especieBox.options[especieBox.selectedIndex].textContent
    eliminarCards() 
    const pjs = await peticion()
    const arrayEspecie = pjs.filter(pj=>pj.species==t) 
    cargarPagina(arrayEspecie)
}

async function filtradoPorGenero(){
    let t = generoBox.options[generoBox.selectedIndex].textContent
    eliminarCards() 
    const pjs = await peticion()
    const arrayg = pjs.filter(pj=>t=='no definido'?pj.gender==="":pj.gender===t) 
    cargarPagina(arrayg)
}

async function filtrarPorAmbas(){
    let s = especieBox.options[especieBox.selectedIndex].textContent
    let g = generoBox.options[generoBox.selectedIndex].textContent
    const pjs = await peticion()
    eliminarCards()
    const array = pjs.filter(pj=>{
        if (g=='no definido') {
            if (pj.gender==="" && pj.species===s) {
                return true
            }
        } else {
            if(pj.gender===g && pj.species===s){
                return true
            }
        }
    })
    cargarPagina(array)
}

async function peticion(){
    try {
        const respuesta = await fetch('https://hp-api.onrender.com/api/characters')
    
            if(respuesta.status != 200){
                throw new Error(`Error en la petición ${respuesta.status}.`);            
            }
    
            const arrayPersonajes = await respuesta.json()   
            return arrayPersonajes        
    } catch (error) {
        let text = document.createElement('p')
        text.className = 'errorMensaje'
        text.textContent = error.message
        div.appendChild(text)
    }
}

function eliminarCards() {
    // Selecciona todos los elementos con la clase 'card'
    const cards = document.querySelectorAll('.card');
    
    // Recorre cada uno de los elementos y los elimina
    cards.forEach(card => card.remove());
  }

async function filtrarName() {
    const nombre = barra.value.toLowerCase()
    if (nombre==="") {
        alert("¡Escriba algo!")
        return 
    }else{
        eliminarCards()
        const pjs = await peticion()
        const array = pjs.filter(pj=>pj.name.toLowerCase().startsWith(nombre) || pj.actor.toLowerCase().startsWith(nombre))
        cargarPagina(array)
    }
}