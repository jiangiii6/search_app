const search = document.querySelector("form");
const searchBtn = document.getElementById("nav__btn");

const detail = document.querySelector(".res__detail");
const p = document.querySelector("p");
const section = document.querySelector("section");
const loader = document.getElementById("loader");

//searchBtn.addEventListener("click", lalala);
search.addEventListener("submit", submitSearch);

// function lalala(e){
//     e.alert("hi");
// }
search.addEventListener("submit", function(e){
  const input = document.querySelector("#text").value;
    e.preventDefault();
      submitSearch(input);
});


function submitSearch(ARTIST_NAME) {
  fetch(
    `https://itunes.apple.com/search?term=${ARTIST_NAME}&media=music&entity=album&attribute=artistTerm&limit=200`
  )
    .then((response) => response.json())
    //.then((data)=> console.log(data));
   .then((data) => show(data.results)) 
   .catch((error) => console.error(`Error fetching data: ${error.message}`));
}

function show(cards) {
    while (section.firstChild) {
        section.removeChild(section.firstChild);
      }
   //section.innerHTML="";
  //console.log(cards);
  // console.log("haha");

  if (cards.length === 0) {
    p.textContent = "No results.";
  } else {
    p.textContent="";
    loader.style.setProperty('visibility', 'visible');
  }

  setTimeout(() => {
    const ARTIST_NAME = document.querySelector("#text").value;
    loader.style.setProperty('visibility', 'hidden'); 
    // console.log(cards.length);
    p.textContent = `${cards.length} results for "${ARTIST_NAME}"`;
    // for (let i = 0; i < cards; i++) {
    for (const card of cards) {
      //const card = cards[i];
      const div = document.createElement("div");
      const img = document.createElement("img");
      const name = document.createElement("h5");
      //console.log(card);

      img.src = `${card.artworkUrl100}`;
      // console.log(img.src);
      name.textContent = card.collectionName;
      //console.log(card.collectionName);

      div.appendChild(img);
      div.appendChild(name);
      section.appendChild(div);
    }
    }, "1000")
  
  }

