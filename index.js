document.addEventListener("DOMContentLoaded", () => {
	// console.log("Hello World")
	// console.log("banana", banana)
	// let banana = "bananas"
	// var helloWorld = function(str1, str2){
	// 	return `${str1} ${str2}`
	// }

	// function helloWorld(str1, str2){
	// 	return `${str1} ${str2}`
	// }

	// let helloWorld = (str1, str2) => `${str1} ${str2}`

	// [1,2,3,4,5].map{|element| element + 2}

	// let addTwo = function(number){
	// 	return number + 2
	// }

	// let addTwo = number => {
	// 	return number + 2
	// }

	// let addTwo = number => number + 2
	// [1,2,3,4,5].map(addTwo)

	// console.log([1,2,3,4,5].map(number => number + 2))

	// let array = [2, 4, 6, 8, 9, 10, 15, 16, 17, 23]
	// keep all even

	// let result = array.filter(function(el){
	// 	return el % 2 === 0
	// })

	// let result = array.filter(el => el % 2 === 0)

	// console.log(result)

	// let filterArray = arr => arr.filter(el => el % 2)
	// console.log(filterArray([2, 4, 6, 8, 9, 10, 15, 16, 17, 23]))

	// console.log(helloWorld("hello", "world"))
	// const zooAnimals = ["KevyWevy the Bird", "Jerold the Squirrel", "Simon the Squid", "Tara the Elephant", "Kudzanayi the Wizard"]

	 // the Bird", "Jerold the Squirrel", "Simon the Squid", "Tara the Elephant", "Kudzanayi the Wizard"]

	const cage = document.querySelector("#zoo-animals");
	const form = document.querySelector("#create-animal");
	form.addEventListener("submit", () => {
		event.preventDefault()
		console.log("event target", event.target.species.value)
		let name = event.target.name.value
		let species = event.target.species.value
		let legs = event.target.legs.value
		let hobby = event.target.hobby.value
		let image = event.target.image.value
		// e.preventDefault

		// save to the database

		// show the new thing on DOM
		fetch("http://localhost:3000/animals", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name,
				species,
				legs,
				hobby,
				image
			})
		})
		.then(res => res.json())
		.then(animal => console.log(animal))
	})

	fetchAnimals()

	function fetchAnimals(){
		// console.log("fetching animals...")
		fetch("http://localhost:3000/animals")
		.then(res => res.json())
		// .then(console.log)
		// same as:
		// .then(animals => console.log(animals))
		.then(animals => {
			animals.forEach(putAnimalOnDOM)
		})
	}

	function putAnimalOnDOM({name, species, legs, hobby, image}){
		const li = document.createElement('li')
		li.innerText = `${name} the ${species}`
		let showDiv = false;
		li.addEventListener("click", () => {
			const infoDiv = document.querySelector("#info-div")
			if (showDiv){
				infoDiv.innerHTML = `<h1>${name} the ${species}</h1>
				<h2>Legs: ${legs}</h2>
				<h2>Hobby: ${hobby}</h2>
				<img src=${image}>`
				showDiv = false;
			} else {
				showDiv = true;
				infoDiv.innerHTML = ""
			}
		})
		cage.append(li)
	}

	// zooAnimals.forEach(object => {
	// 	const li = document.createElement('li')
	// 	li.innerText = `${object.name} the ${object.species}`
	// 	li.addEventListener("click", () => {
	// 		const infoDiv = document.querySelector("#info-div")
	// 		infoDiv.innerHTML = `<h1>${object.name} the ${object.species}</h1>
	// 		<h2>Legs: ${object.legs}</h2>
	// 		<h2>Hobby: ${object.hobby}</h2>
	// 		<img src=${object.image}>`
	// 	})
	// 	cage.append(li)
	// })




})
