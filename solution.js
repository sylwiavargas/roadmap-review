
// event listener to ensure DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  // important variables:
  const URL = 'http://localhost:3000/animals'
  const cage = document.querySelector('#zoo-animals')
  const infoDiv = document.querySelector('#animal-info')
  const newForm = document.querySelector('#create-animal')

  // functionality:

  newForm.addEventListener('submit', createAnimal)

  fetchAnimals()
  .then(makeAnimalList)


  // useful functions:
  // READ:
  function fetchAnimals(){
    return fetch(URL).then(res => res.json())
  }

  function makeAnimalList(animals){
    animals.forEach(makeOneSpan)
  }

  function makeOneSpan(animal){
    const p = document.createElement('p')
    p.innerHTML = `<span data-id="${animal.id}">${animal.name} the ${animal.species}</span>  <button id="delete-button">DELETE</button>`
    p.dataset.id = animal.id
    p.addEventListener('click', clickBeast)
    cage.append(p)
  }

  // READ one animal:
  function clickBeast(){
    // make a fetch
    if (event.target.id === 'delete-button'){
      let id = event.target.parentElement.dataset.id
      clickDelete(id)
    } else {
      let id = event.target.dataset.id
      fetchAnimal(id)
      // put animal on DOM
      .then(putAnimalOnDOM)
    }
  }

  function fetchAnimal(id){
    console.log(id)
    return fetch(`${URL}/${id}`)
    .then(res => res.json())
  }

  function putAnimalOnDOM(animal){
    // console.log("putting on dom")
    // debugger;
    const newDiv = document.createElement('div')
    // if (infoDiv.innerHTML && infoDiv.dataset.id === animal.id.toString()){
      // infoDiv.innerHTML = ""
    // } else {
      infoDiv.innerHTML = ""
      infoDiv.dataset.id = null
      newDiv.innerHTML = `<h3>${animal.name} the ${animal.species}</h3><p>Ferociousness: ${animal.ferociousness}</p><p>Hobby: ${animal.hobby}</p><img src="${animal.image}"/><br><button id='update-button'>UPDATE Beast</button> `
      infoDiv.dataset.id = animal.id
      infoDiv.append(newDiv)
      let updateButton = infoDiv.querySelector('#update-button')
      updateButton.addEventListener('click', () => showUpdateForm(animal))
    // }
  }

  // DELETE:
  // delete an animal from DOM
  function clickDelete(animalId){
    // send delete request
     sendDeleteRequest(animalId)
    // remove from list
     .then(() => removeAnimalFromDOM(animalId))
     .then(() => {
    // possibly remove from infoDiv if it's up
      if (infoDiv.dataset.id === animalId){
        infoDiv.innerHTML = ""
      }
     })
  }

  function sendDeleteRequest(id){
    return fetch(`${URL}/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
  }

  function removeAnimalFromDOM(id){
    let animalp = cage.querySelector(`[data-id="${id}"]`)
    animalp.remove()
  }


  // CREATE new animal:
  // add click event to form (DONE)

  function createAnimal(){
    event.preventDefault()
    let newAnimal = gatherFormData()
    createOnBackEnd(newAnimal)
    .then(makeOneSpan)
  }

  function gatherFormData(){
    return {
      name: event.target.name.value,
      species: event.target.species.value,
      ferociousness: event.target.feral.value,
      hobby: event.target.hobby.value,
      image: event.target.image.value
    }
  }

  function createOnBackEnd(animal){

    return fetch(URL, {
      headers: {'Content-Type': 'application/json'},
      method: "POST",
      body: JSON.stringify(animal)
    })
    .then(res => res.json())
  }

  // UPDATE:
  function showUpdateForm({id, name, species, ferociousness, hobby, image}){
    // make form appear
    let updateForm = document.createElement('form')
    updateForm.id = "update-form"
    updateForm.innerHTML = `
      Name:<br>
      <input type="text" name="name" value="${name}"><br>
      Species:<br>
      <input type="text" name="species" value="${species}"><br>
      Ferociousness:<br>
      <input type="text" name="feral" value="${ferociousness}"><br>
      Hobby:<br>
      <input type="text" name="hobby" value="${hobby}"><br>
      Image:<br>
      <input type="text" name="image" value="${image}"><br>
      <input type="submit" name="">`
    !document.querySelector('#update-form') && infoDiv.append(updateForm)
    updateForm.addEventListener('submit', () => patchAnimal(id))
  }


  function patchAnimal(id){
    event.preventDefault()
    let formData = gatherFormData()
    fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then((animal) => {
      putAnimalOnDOM(animal)
      // debugger
      let animalp = cage.querySelector(`p [data-id="${animal.id}"]`)
      animalp.innerText = `${animal.name} the ${animal.species}`
    })

  }






})
