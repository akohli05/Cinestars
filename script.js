class Main{
	current(value){
		console.log("You are currently on page " + value + ".");
	}
}

class Person extends Main{
	current(value){
		console.log("You are currently viewing " + value + "'s profile.");
	}
}

class Search extends Person{
	current(value){
		console.log("You searched for '" + value + "'.");
	}
}


const API_KEY = 'api_key=a26c7754f852ab8be5eab7814aa98e7d';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/person/popular?'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/person?'+API_KEY;

const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');

const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;

//Classes
var mainClass = new Main();
var personClass = new Person();
var searchClass = new Search();

mainClass.current(currentPage);//Current page

getActors(API_URL);//Popular actors

function getActors(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if(data.results.length !== 0){
            showActors(data.results);
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalPages = data.total_pages;

            current.innerText = currentPage;

            if(currentPage <= 1){
              prev.classList.add('disabled');
              next.classList.remove('disabled')
            }else if(currentPage>= totalPages){
              prev.classList.remove('disabled');
              next.classList.add('disabled')
            }else{
              prev.classList.remove('disabled');
              next.classList.remove('disabled')
            }

            tagsEl.scrollIntoView({behavior : 'smooth'})

        }else{
            main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
        }
       
    })

}

//Show actors
function showActors(data) {
    main.innerHTML = '';

    data.forEach(actor => {
        const {name, profile_path, popularity, id} = actor;
        const actorEl = document.createElement('div');
        actorEl.classList.add('actor');
        actorEl.innerHTML = `
             <img src="${profile_path? IMG_URL+profile_path: "http://via.placeholder.com/1080x1580?text=No+Image" }" alt="${name}">

            <div class="actor-info">
                <h3>${name}</h3>
                <span class="${popularity}">${popularity}</span>
            </div>

            <div class="overview">
				<h1></h1>
                <button class="know-more" id="${id}">Know More</button
            </div>
        
        `

        main.appendChild(actorEl);

        document.getElementById(id).addEventListener('click', () => {
          console.log(id)
          openNav(actor)
        })
    })
}


/*Search for a specific person */
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
	searchClass.current(searchTerm);
    if(searchTerm) {
        getActors(searchURL+'&query='+searchTerm)
    }else{
        getActors(API_URL);
    }

})

const overlayContent = document.getElementById('overlay-content');
const popupForm = document.getElementById('myForm');
/* Open when someone clicks on the span element */
function openNav(actor) {
  let id = actor.id;
  fetch(BASE_URL + '/person/'+id+'?'+API_KEY).then(res => res.json()).then(personData => {
    
      document.getElementById("myNav").style.width = "100%";
      
	  const {id, name, profile_path, birthday, deathday, gender, place_of_birth, also_known_as, biography} = personData
	  personClass.current(name);//Console log the current person we are viewing
	  showActorMovies(id)//Displays all the actor's movies
	  showActorTvShows(id)//Displays all the actor's tv shows
	  loadNotes(id)//load all notes associated with an actor

		overlayContent.innerHTML = `
		 <img src="${profile_path? IMG_URL+profile_path: "http://via.placeholder.com/1080x1580?text=No+Image" }" alt="${name}">
		 
		<div class="tabs-container">
		<h2>${name}</h2>
  
			<div class="actor-info-tab-bar">
			<button class="tablink active" onclick="openActorInfoTab(event,'Biography')" id="defaultOpenTab">Biography</button>
			<button class="tablink" onclick="openActorInfoTab(event,'FunFacts')">General Facts</button>
			<button class="tablink" onclick="openActorInfoTab(event,'Works')">Movies & TV Shows</button>
			<button class="tablink" onclick="openActorInfoTab(event,'Notes')">Notes</button>
			</div>
			
			<div id="Biography" class="tabcontent option">
			<p>${this.handlePossibleNulls(biography)}</p>
			</div>

			<div id="FunFacts" class="tabcontent option" style="display:none">
				<ul>
				  <li>Born: ${this.handlePossibleNulls(birthday)}</li>
				  <li>Died: ${this.handlePossibleNulls(deathday)}</li>
				  <li>Gender: ${this.getGender(gender)}</li>
				  <li>Place of Birth: ${place_of_birth}</li>
				  <li>Also Known As: ${also_known_as}</li>
				</ul>  
			</div>

			<div id="Works" class="tabcontent option" style="display:none">
				<h4 id="NoMovies"></h4>
				<h4 id="NoTVShows"></h4>				
			</div>
			
			<div id="Notes" class="tabcontent option" style="display:none" >
				<div id = "allNotesDiv"></div>

				<button class="open-button" id="openFormBTN" onclick="openForm()">Add Note</button>
				
				<div class="form-popup" id="myForm">
				
				  <form action="send_notes_form_results.php" class="form-container" method="post"  enctype='multipart/form-data'>
					<h3>Add Note</h3>

					<label for="actorID"><b>Actor ID - Auto</b></label>
					<input type="text" value="${id}" name="actorID" readonly>

					<label for="notesContent"><b>Content</b></label>
					<textarea id="theActualNote" name="notesContent" rows="4" cols="50" required>Custom note</textarea>

					<button type="submit" name = "submit_note" class="btn">Submit</button>
					<button type="button" class="btn cancel" onclick="closeForm()">Close</button>
				  </form>
				</div>		
			</div>

		
		</div>
		 
	`
		// Default tab opened when page loads
		const defaultTab = document.getElementById("defaultOpenTab");
		if (defaultTab) {
			document.getElementById("defaultOpenTab").click();
		}
  })
}

//Loads all the notes relating the actor
function loadNotes(actorID){
      fetch("get_all_notes.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: `actorID=${actorID}`,
      })
      .then((response) => response.text())
      .then((res) => (document.getElementById("allNotesDiv").innerHTML = res));
    }
	
//Show all movies of the actor
function showActorMovies(id) {
    fetch(BASE_URL + '/person/'+id+'/movie_credits?'+API_KEY).then(res => res.json()).then(actorMoviesData => {
		
		const noMovies = document.getElementById("NoMovies");
		const moviesParent = document.getElementById("Works");
		const allMovies = actorMoviesData.cast;
		console.log(allMovies)
		
		//If there are results
		if(allMovies.length != 0){
			allMovies.forEach(actorMovie => {
				const {original_title, poster_path, id} = actorMovie;
				const actorMovieEl = document.createElement('div');
				actorMovieEl.classList.add('actorMovie');
				actorMovieEl.innerHTML = `
					 <figure>
						<img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/200x250?text=No+Image" }" alt="${name}">
						<figcaption>${original_title}</figcaption>
					</figure> 
				
				`
				
				moviesParent.append(actorMovieEl);

			})
		}else{
			 noMovies.innerHTML= `No Movies Found</br> <hr> </br>` //Display no results
		}
	})
}


//Show all tv shows of the actor
function showActorTvShows(id) {
    fetch(BASE_URL + '/person/'+id+'/tv_credits?'+API_KEY).then(res => res.json()).then(actorTVData => {
		
		const noTVShows = document.getElementById("NoTVShows");
		const tvParent = document.getElementById("Works");
		const allTVShows = actorTVData.cast;
		console.log(allTVShows)
		
		//If there are results
		if(allTVShows.length != 0){
			allTVShows.forEach(actorTV => {
				const {original_name, poster_path, id} = actorTV;
				const actorTVEl = document.createElement('div');
				actorTVEl.classList.add('actorTV');
				actorTVEl.innerHTML = `
					 <figure>
						<img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/200x250?text=No+Image" }" alt="${name}">
						<figcaption>${original_name}</figcaption>
					</figure> 
				
				`
				
				tvParent.append(actorTVEl);

			})
		}else{
			 noTVShows.innerHTML= `No TV Shows Found</br> <hr> </br>` //Display no results
		}
	})
}


/* Takes in a value and if its null or blank then 'N/A' is returned */
function handlePossibleNulls(value) {
    if(value == null || value == ""){
        return 'N/A'
    }
	else{
		return value
	}
}

/* Takes in the gender id and converts it to a string value */
function getGender(genderID) {
    if(genderID == 1){
        return 'Female'
    }else if(genderID == 2){
        return "Male"
    }else{
        return 'Not Specified'
    }
}


/* Opens different tabs with info relating to the actor */
function openActorInfoTab(evt, option) {
  var i, x, tablinks;
  x = document.getElementsByClassName("option");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(option).style.display = "block";
  evt.currentTarget.className += " active";
}

//Opens the Notes pop up form
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

//Closes the Notes pop up form
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  closeForm();
  document.getElementById("openFormBTN").style.display = "none";
  
}

/*Goes back to the previous page */
prev.addEventListener('click', () => {
  if(prevPage > 0){
    pageCall(prevPage);
	mainClass.current(prevPage);
  }
})

/*Goes to the next page */
next.addEventListener('click', () => {
  if(nextPage <= totalPages){
    pageCall(nextPage);
	mainClass.current(nextPage);
  }
})

function pageCall(page){
  let urlSplit = lastUrl.split('?');
  let queryParams = urlSplit[1].split('&');
  let key = queryParams[queryParams.length -1].split('=');
  if(key[0] != 'page'){
    let url = lastUrl + '&page='+page
    getActors(url);
  }else{
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length -1] = a;
    let b = queryParams.join('&');
    let url = urlSplit[0] +'?'+ b
    getActors(url);
  }
}

