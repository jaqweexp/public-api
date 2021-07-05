const searchContainer = document.getElementsByClassName('search-container')
const galleryContainer = document.getElementById('gallery');
const cardArray = document.getElementsByClassName('card');

let firstName;
let lastName;
let email;
let city;
let state;
let dob;
let cell;
let picture;
let streetName;
let streetNumber;
let postcode;

let formattedPhone;

let modal;

let formattedDOB;
let year;
let month;
let date;

//get all names in an array for search functionality
let allNames = []

//create card function
const insertCard = (first, last, email, city, state) => {
	galleryContainer.insertAdjacentHTML('beforeend', `
	                <div class="card">
	                    <div class="card-img-container">
	                        <img class="card-img" src="${picture}" alt="profile picture">
	                    </div>
	                    <div class="card-info-container">
	                        <h3 id="name" class="card-name cap">${first}</h3>
	                        <p class="card-text">${email}</p>
	                        <p class="card-text cap">${city}, ${state}</p>
	                    </div>
	                </div>`)
}

//close modal function
const closeModal = (i) => {
	modal = document.getElementsByClassName('modal-container');
	modal[i].style.display = "none";
}




//format phone number function
const formatPhoneNumber = (unformattedNum) => {
  let numOnly = ('' + unformattedNum).replace(/\D/g, '');
  let match = numOnly.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    formattedPhone = '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
}


//format DOB function
const formatDOB = (unformattedDOB) => {
	let dobString = String(unformattedDOB);
	year = dobString[0]+dobString[1]+dobString[2]+dobString[3];
	month = dobString[5]+dobString[6];
	date = dobString[8]+dobString[9];
	formattedDOB = `${month}/${date}/${year}`;
}

//create modals function
const insertModal = (picture, firstName, lastName, email, city, state, dob, phone, streetName, streetNumber, postcode) =>{
	formatPhoneNumber(phone);
	formatDOB(dob);
	galleryContainer.insertAdjacentHTML('beforeend', `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${picture}">
                        <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
                        <p class="modal-text">${email}</p>
                        <p class="modal-text cap">${city}</p>
                        <hr>
                        <p class="modal-text">${formattedPhone}</p>
                        <p class="modal-text">${streetNumber} ${streetName}, ${city}, ${state} ${postcode}</p>
                        <p class="modal-text">Birthday: ${formattedDOB}</p>
                    </div>
                </div>`)

}


//generic fetch function
function fetchData(url) {
  return fetch(url)
           // .then(checkStatus)  
           .then(res => res.json())
           .catch(error => console.log('Looks like there was a problem!', error))
}
//fetching random user generator API
Promise.all([
  fetchData('https://randomuser.me/api/?results=12&nat=us,ca'),
  
])
	.then(data =>{
		//create foreach loop to get info below and insert into card
		
		for(let i = 0; i < 12; i++){
			firstName = data[0].results[i].name.first
			lastName = data[0].results[i].name.last
			email = data[0].results[i].email
			city = data[0].results[i].location.city
			state = data[0].results[i].location.state
			picture = data[0].results[i].picture.large
			insertCard(firstName, lastName, email, city, state, picture)
			
			//for search funcionality
			allNames.push(firstName + " " + lastName);

			//for modal	 
			cardArray[i].addEventListener("click", function() {
		       firstName = data[0].results[i].name.first
		       lastName = data[0].results[i].name.last
		       email = data[0].results[i].email
		       city = data[0].results[i].location.city
		       state = data[0].results[i].location.state
		       picture = data[0].results[i].picture.large
		       dob = data[0].results[i].dob.date
			   phone = data[0].results[i].phone
		       streetName = data[0].results[i].location.street.name
		       streetNumber = data[0].results[i].location.street.number
		       postcode = data[0].results[i].location.postcode;
			   
			   insertModal(picture, firstName, lastName, email, city, state, dob, phone, streetName, streetNumber, postcode);
			   
			   const modalButton = document.getElementsByClassName('modal-close-btn');
			   for (let i = 0 ; i < modalButton.length ; i++){
					modalButton[i].addEventListener("click", function(){
											closeModal(i);
											});
				}

		 })
		}
	})


