var isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

window.transitionToPage = function(href, id) {
document.querySelector('body').style.opacity = 0
setTimeout(function() { 
    window.location.href = href
}, 300)

} 

preloadImages(startAfterPreload);
function startAfterPreload(){
setTimeout(function() {
  if (isMobile.any() || window.self != window.top){
    document.getElementById("siteheader-content").style.display = "none";
    document.getElementById("dropdiv").style.display = "inline-block";
    if (document.getElementById("TITLE")!=null){
      document.getElementById("TITLE").style.fontSize = "1.5rem";
      document.getElementById("TITLE").style.fontWeight = "bold";
    }

    var logoImg = document.getElementById("logoimg");
    logoImg.style.height = "100%";
    logoImg.style.width = "auto";
    const info = document.querySelectorAll('.info');
    info.forEach(element => {
      element.style.fontSize = "0.7rem";
    });
    const info3 = document.querySelectorAll('.info2');
    info3.forEach(element => {
      element.style.fontSize = "0.7rem";
    });
    const info2 = document.querySelectorAll('.bottom-right-text');
    info2.forEach(element => {
      element.style.fontSize = "0.85rem";
    });

    if (document.getElementById("titledescription")!=null){
      document.getElementById("titledescription").style.fontSize = "1rem";
    }
    if (document.getElementById("text1")!=null && window.matchMedia("(orientation: portrait)").matches){
      document.getElementById("text1").innerHTML = "This website shows drawings I drew for fun. This website was made in a day using HTML, CSS, and JS. I hope you enjoy! :P";
    }

  }
  document.querySelector('body').style.opacity = 1;
}, 50);
}

// Function to preload images
function preloadImages(callback) {
if (document.title == "About Us"){
  var imageUrls = [
    "images/connectlogo.png",
    "images/Croppedbackground1.png",
    "images/open.png",
      "images/close.png",

    "images/maxpicture.jpg"
  ];
}
else if (document.title == "People"){
  var imageUrls = [
    "images/connectlogo.png",
    "images/Croppedbackground1.png",
    "images/open.png",
    "images/caden.jpg",
    "images/close.png",
    "images/maxpicture.jpg",
    "images/person5.jpg",
    "images/person7.jpg",
    "images/person6.jpg"
  ];
}
else if (document.title == "Ipad"){
  var imageUrls = [
    "images/connectlogo.png",
    "images/Croppedbackground1.png",
    "images/open.png",
      "images/close.png",
    "images/ipad1.jpg",
    "images/ipad2.jpg"
  ];
}
else if (document.title == "Other"){
  var imageUrls = [
    "images/connectlogo.png",
    "images/Croppedbackground1.png",
    "images/open.png",
      "images/close.png",
    "images/other6.jpg",
    "images/other2.jpg",
    "images/other3.jpg",
    "images/other1.jpg"
  ];
}
else{
  var imageUrls = [
    "images/connectlogo.png",
    "images/Croppedbackground1.png",
    "images/maxpicture.jpg",
    "images/person1.jpg",
    "images/open.png",
    "images/close.png",
    "images/other1.jpg",
    "images/ipad1.jpg"
  ];
}

var loadedImagesCount = 0;
var totalImages = imageUrls.length;

function loadImage(url) {
  if (!url) {
    loadedImagesCount++;
    if (loadedImagesCount === totalImages-1) {
      callback();
    }
    return;
  }

  var img = new Image();
  img.src = url;

  img.onload = function() {

    loadedImagesCount++;
    if (loadedImagesCount === totalImages) {
      callback();
    }
  };

  img.onerror = function() {
    console.error("Error loading image: " + url);
    loadedImagesCount++;
    if (loadedImagesCount === totalImages) {
      callback();
    }
  };
}

imageUrls.forEach(function(url) {
  loadImage(url);
});
}

//w3 schools dropdown, not mine
function myFunction() {
document.getElementById("myDropdown").classList.toggle("show");
if (document.getElementById("myDropdown").classList.contains("show")){
  document.getElementById("dropimg").src = "images/close.png";
}
else{
  document.getElementById("dropimg").src = "images/open.png";
}

}

// Close the dropdown menu if the user clicks outside of it
document.body.addEventListener('click', function () {
if (!event.target.matches('.dropbtn')) {
  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      document.getElementById("dropimg").src = "images/open.png";
      openDropdown.classList.remove('show');
    }
  }
}
});


//opens images fully when clicked
const imgs = document.querySelectorAll('.clickable');
const fullPage = document.querySelector('#fullpage');
imgs.forEach(img => {
img.addEventListener('click', function() {
  fullPage.style.backgroundImage = 'url(' + img.src + ')';
  fullPage.style.display = 'block';
  if (img.id == "rajatpicture"){
    fullPage.style.backgroundImage = 'url(' + "images/rajat.png" + ')';
  }
  if (img.id == "cadenpicture"){
    fullPage.style.backgroundImage = 'url(' + "images/caden.jpg" + ')';
  }
});
});