document.addEventListener("DOMContentLoaded", () => {

  const animals = document.querySelector('#zoo-animals')
  const animalInfo = document.querySelector('#animal-info')
  let seeAnimal = false
  const animalNewSubmit = document.querySelector('#submit-new')
  const animalForm = document.querySelector('#create-animal')
  animalForm.addEventListener('submit', createNewAnimal)


  fetch('http://localhost:3000/animals')
  .then(response => response.json())
  .then(a => a.forEach(slapItOnTheDiv))

  function slapItOnTheDiv(animal) {
    const animalp = document.createElement('p');
    animalp.dataset.id = animal.id
    animalp.innerHTML = `<span>${animal.name} the ${animal.species}</span>`
    animals.appendChild(animalp);
    const buttond = document.createElement('delete-button')
    buttond.innerHTML = `<button id="delete-button-${animal.id}">DELETE</button>`
    animals.appendChild(buttond);
    animalp.addEventListener('click', () => {
      if (!document.querySelector(`div[data-id="${animal.id}"]`) || seeAnimal == false){
        toggleShow(animal);
        animalInfo.style.display = 'block';
        seeAnimal = true
      } else {
        animalInfo.style.display = 'none';
        seeAnimal = false
      }
    })
    const delAnimal = animals.querySelector(`#delete-button-${animal.id}`)
    delAnimal.addEventListener('click', () => {deleteAnimal(animal) })
  }

  function toggleShow(animal) {
    const animald = document.createElement('div');
    animald.dataset.id = animal.id
    animalInfo.innerHTML = ""
    animald.innerHTML = `<h3>${animal.name} the ${animal.species}</h3>  <p> Ferociousness: ${animal.ferociousness} </p> <p> Hobby: ${animal.hobby} </p> <img src = "${animal.image}">`
    const buttonU = document.createElement('update-button')
    buttonU.innerHTML = `<button id="update-button-${animal.id}">UPDATE</button>`
    animalInfo.appendChild(animald)
    animalInfo.appendChild(buttonU)
    const eAnimal = document.querySelector(`#update-button-${animal.id}`)
    eAnimal.addEventListener('click', () => {editAnimal(animal)})
  }

  function gatherFormData(){
    return {
      hobby: event.target.hobby.value,
      image: event.target.image.value,
      name: event.target.name.value,
      species: event.target.species.value,
      ferociousness: event.target.ferociousness.value
    }
  }

  function createNewAnimal(event) {
    event.preventDefault();
    let newAnimal = gatherFormData();
    return fetch('http://localhost:3000/animals', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newAnimal)
    })
    .then(res => res.json())
    .then(animal => (slapItOnTheDiv(animal)));
  }

  function deleteAnimal(animal) {
    const animalp = document.querySelector(`[data-id="${animal.id}"]`);
    const buttond = document.querySelector(`#delete-button-${animal.id}`);
    // const animalshow = document.querySelector(`[data-id="${animal.id}"]`);
    return  fetch(`http://localhost:3000/animals/${animal.id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(() => {
      animalp.remove();
      buttond.remove()
      if (document.querySelector(`[data-id="${animal.id}"]`)) {
            animalInfo.innerHTML = ""
      }
    })
  }

  function editAnimal(animal) {
        event.preventDefault()
      const eForm = document.createElement('form')
      let {name, species, ferociousness, hobby, image} = animal
      eForm.id = "update-form"
      eForm.innerHTML = `Name:<br><input type="text" name="name" value="${name}"><br>Species:<br><input type="text" name="species" value="${species}"><br>Ferociousness:<br><input type="text" name="ferociousness" value="${ferociousness}"><br>Hobby:<br><input type="text" name="hobby" value="${hobby}"><br>Image:<br><input type="text" name="image" value="${image}"><br><input type="submit" name="">`
      animalInfo.append(eForm)
      eForm.addEventListener('submit', () => updateAnimal(animal))
  }



  function updateAnimal(animal) {
    event.preventDefault()
    let updatedAnimal = gatherFormData()
    updateOnBackend(updatedAnimal, animal.id)
    .then(updateOnFrontEnd(animal))

  }

  function updateOnBackend(updatedAnimal, id){
    return fetch(`http://localhost:3000/animals/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedAnimal),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
  }

  function updateOnFrontEnd(animal){
      slapItOnTheDiv(animal)
      const animalp = animals.querySelector(`p[data-id="${animal.id}"]`)
      animalp.innerText = `${animal.name} the ${animal.species}`
  }

})
