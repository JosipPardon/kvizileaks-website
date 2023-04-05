
numberOfImportantLoadedElements = 0;
animateLoad = true;
loadingProgress = 0;
let progressBar = document.querySelector('.progress-bar')


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}


let loadingInterval = setInterval(function () {
  loadingProgress += getRandomArbitrary(0, (100 - loadingProgress)*0.5);
  progressBar.style.width = loadingProgress + '%';

}, 1000);

setTimeout(function () {
  /*
    ovo napravi da se prikaže loadanje samo ako se stranica učitava dulje od 250ms
  */
  let loadingElement = document.querySelector('.loading-element')
  loadingElement.style.opacity = "1";
}, 250); 

setTimeout(function () {
  let loadingText = document.querySelector('#loading-1')
  loadingText.innerHTML = "Konekcija je nažalost slaba u ovom trenutku..."

}, 4500);

setTimeout(function () {
  let loadingText = document.querySelector('#loading-2')
  loadingText.innerHTML = "Probaj osvježiti/refreshati stranicu."

}, 9000);



function startSlideShowanimation() {
  console.log("page is fully loaded");

  let mediaSlideshowContainerChildren = document.querySelector('.media-slideshow-container').children;
  
  let indexes = []; // indexes = [2,3,1]: znači da je element indexa 2 najlijeviji, zatim je desno od njega element indexa 3, zatim je desno od njega element indexa 1
  for (let i = 0; i < mediaSlideshowContainerChildren.length; i++) {
    indexes.push(i) 
  }

  mediaSlideshowContainerChildren[indexes[0]].style.left = "0px";

  function PoravnajElemente() { //pomakne sve elemente tako da su priljubljeni uz elemente lijevo od sebe
    for (let i = 1; i < indexes.length; i++) {
      let element = mediaSlideshowContainerChildren[indexes[i]];
      let leftElement = mediaSlideshowContainerChildren[indexes[i-1]];
      let leftElement_leftOffset = parseFloat(leftElement.style.left.slice(0, -2));
      let leftElement_width = parseFloat(getComputedStyle(leftElement).width);
      element.style.left = leftElement_leftOffset + leftElement_width - 2 + 'px'; //-2 da se videi ipak malo preklapaju, da ne nastaje ona bijela linija granice zbog kašnjenja
    }
  }

  PoravnajElemente();

  let maxStep = 1.2; let minStep = 1.2;
  // console.log(window.innerWidth) iz nekog razloga ovo nije 1920 u fullscreenu nego 1336
  let step = -(Math.min(minStep + Math.max((maxStep - minStep)*(window.innerWidth / 1920), 0), maxStep)); //ovaj kod effektivno interpolira step između minStep i maxStep (ovisno koliko je ekran širok) 
  


  setInterval(function() { 


    let mostLeftElement = mediaSlideshowContainerChildren[indexes[0]];
    let mostLeftElement_leftOffset = parseFloat(mostLeftElement.style.left.slice(0, -2));
    let mostLeftElement_width = parseFloat(getComputedStyle(mostLeftElement).width);
    mostLeftElement_leftOffset += step;
    mostLeftElement.style.left = mostLeftElement_leftOffset + 'px';


    PoravnajElemente();

    if (Math.abs(mostLeftElement_leftOffset) > mostLeftElement_width) {
     indexes.push(indexes.shift()); //prebaci zadnji element na kraj
    }
     
  }, 1000/144);   
  
};


function changePage(pageName) {
  
  let pageContainers = document.querySelectorAll('.page-container');

  for (const pageContainer of pageContainers) {
    pageContainer.classList.add('hidden')
  }

  let selectedPageContainer = document.querySelector("#"+pageName);
  selectedPageContainer.classList.remove('hidden')



  let navLinks = document.querySelectorAll('.nav-link');

  for (const navLink of navLinks) {
    navLink.classList.remove('active')
  }

  let selectedNavLink = document.querySelector("#link_" + pageName);
  selectedNavLink.classList.add('active');

}

function importantLoaded() {
  numberOfImportantLoadedElements += 1
  let neededNumber = document.querySelectorAll('.important-load').length
  let websiteContent = document.querySelector('.website-content')
  let loadingElement = document.querySelector('.loading-element')
  if (numberOfImportantLoadedElements == neededNumber) {
    progressBar.style.width = '100%';
    startSlideShowanimation();
    clearInterval(loadingInterval);
    loadingElement.style.display = 'none'
    websiteContent.style.opacity = "1"; //kada se sve učita, da se prikaže content

  }
}





