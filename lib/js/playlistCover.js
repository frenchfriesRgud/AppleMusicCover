/* 
written by @frenchfriesRgud

2020-07-09
*/

//------------------------------------
function updateElement(contentID, destinationID, prefix) {
    // takes the input value and desitination selector
    value = document.querySelector("#"+contentID).value;
    if(prefix){
        value = prefix + value;
    }
    document.querySelector("#"+destinationID).textContent = value;
}
//------------------------------------
function toggleName(){
    document.getElementById("playlist-name").classList.toggle("disappear");
    document.getElementById("input-name").classList.toggle("disappear");
}
//------------------------------------
function toggleCredits(){
    credits = !credits;
    document.querySelector("#top-right-btn").classList.toggle("disappear");
    document.querySelector("#top-left-btn").classList.toggle("disappear");
    document.querySelector(".app").classList.toggle("hide");
    document.querySelector(".viewport").classList.toggle("hide");
    document.querySelector("#credit").classList.toggle("hide");

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if(credits){
        document.querySelector("#top-left-btn").textContent ='Back';
        document.querySelector("#top-left-btn").addEventListener("click", toggleCredits)
    }   else {
        document.querySelector("#top-left-btn").textContent ='Cancel';
        document.querySelector("#top-left-btn").removeEventListener("click", toggleCredits)
    }
}
credits = false;

//------------------------------------
// Event listeners

document.querySelector("footer").addEventListener("click", function(){
    toggleCredits();
});
document.querySelector("#use-name-radio").addEventListener("click", function(){
    toggleName();
});
document.querySelector("#input-title").addEventListener("change", function() {
        updateElement("input-title", "playlist-title");
    }
);
document.querySelector("#input-title").addEventListener("keyup", function() {
        updateElement("input-title", "playlist-title");
    }
);
document.querySelector("#input-name").addEventListener("keyup", function() {
        updateElement("input-name", "playlist-name", "@");
    }
);
document.querySelector("#input-name").addEventListener("change", function() {
        updateElement("input-name", "playlist-name", "@");
    }
);