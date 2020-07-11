/* 
written by @frenchfriesRgud

2020-07-09

Last update:
2020-07-10
*/
// Prefill
sample = [
    "Midnight drive",
    "Mellow beats",
    // "Rainy day blues",
    // "Urban trend",
    "Lo-fi summer",
    "Winter mood",
    "Sunset vibes"
    // "Holiday listening",
    // "Happy times",
    // "Chill homework beats",
    // "Jazz Classics",
    // "Billboard Hits",
    // "Radio likes",
    // "Groovy music",
    // "Recommended",
    // "Easy listening",
    // "Piano classics",
    // "Instrumentals",
    // "Workplace jams",
    // "Lo-fi beats",
    // "Coffee jazz"
]
document.querySelector("#playlist-title").textContent = sample[Math.floor(Math.random()*sample.length)];
//------------------------------------
// MODIFICATION
//------------------------------------
function updateForeground(contentID){
    artboard = document.querySelector("#artwork");

    // unselect the existing btn
    document.querySelector(".foreground-choices .foreground-group ul .foreground-active").classList.remove("foreground-active");

    // set the selected btn as active
    artboard.setAttribute("class", "artwork " + contentID.classList[1]);
    contentID.classList.add("foreground-active");
    console.log("Setting class to "+contentID.classList[1]);

}
//------------------------------------
function updateElement(contentID, destinationID, prefix) {
    // takes the input value and desitination selector
    value = document.querySelector("#"+contentID).value;
    document.querySelector("#"+destinationID).textContent = value;
    
    // TODO --- FIX HIDING THE ADD SYMBOL
    if(prefix){
        let prefixEl = document.createElement("span");
        prefixEl.innerHTML = prefix;
        
        // add more prefixes here
        let prefixClasses = {
            "@": "at-sign"
        } 
        prefixEl.classList.add(prefixClasses[prefix]);

        // check if hide @ active
        // hideAtSign = document.querySelector('#use-at-sign-radio').checked;
        // if(hideAtSign){
        //     document.querySelector('.at-sign').classList.add("disappear");
        // }
        //value = prefix + value;
        document.querySelector("#"+destinationID).prepend(prefixEl);
    }
}
//------------------------------------
function transformElement(trigger){

    // get the data
    let parent = trigger.getAttribute("data-action-parent");
    let property = trigger.getAttribute("data-action-target");
    let value = trigger.getAttribute("data-action-value");


    // grab the target
    let target = document.getElementById(parent);
    // store the active command
    commandActive[property] = value;
    // set the active state from the menu
    menuState(property, trigger);

    // implement the property change
    if(property === "text-align") {
        target.style.textAlign = value;
    } else if(property === "align-self") {
        target.style.alignSelf = value;
    } 
    
    console.log("Selector " + parent + " " + property + " value set to " + value)
}
let commandActive = {
    'text-align': '',
    'align-self': '',
    'foreground': '',
    'text-shadow': ''
}
//------------------------------------
// MENUS
//------------------------------------
function menuState(type, active){
    // remove the active state from the menu
    document.querySelector(".options-"+type+" .active").classList.remove("active");
    // set this class to active
    active.classList.add("active");
}
//------------------------------------
function foregroundOptions(category){
    let value = category.getAttribute("data-action-value");
    let foreground = document.querySelector(".foreground-choices .foreground-"+value);
    // update menu
    menuState("foreground", category);

    // register active command
    commandActive['foreground'] = value;

    // hide all foreground groups
    foregroundGroups = document.querySelectorAll(".foreground-group");
    for(let groupBtn of foregroundGroups){
        groupBtn.classList.add("hide");
    }
    
    // show active group
    foreground.classList.remove("hide");

    //document.querySelector("foreground-" + value).classList.remove("hide");
}
//------------------------------------
// TOGGLES
//------------------------------------
function toggleDisplay(){
    artDisplay = !artDisplay;
    console.log("Art display toggled.");

    // hide controls
    document.querySelector(".info").classList.toggle("hide");
    document.querySelector(".alignment").classList.toggle("hide");
    document.querySelector(".palette").classList.toggle("hide");

    // hide fotter
    document.querySelector("#toggleCredit").classList.toggle("hide");
    
    // nav btns
    document.querySelector("#top-right-btn").classList.toggle("disappear");
    document.querySelector("#top-left-btn").classList.toggle("disappear");
    document.querySelector("#top-mid-btn").classList.toggle("disappear");

    if(artDisplay){
        document.querySelector("#top-left-btn").textContent ='Back';
        document.querySelector("#top-left-btn").addEventListener("click", toggleDisplay)

        // set artwork to perfect square
        // get the current width
        let width = document.querySelector(".viewport").offsetWidth + "px";
        document.querySelector(".artwork").style.height = width;

    }   else {
        
        document.querySelector(".artwork").style.height = "250px";
        document.querySelector("#top-left-btn").textContent ='Back';
        document.querySelector("#top-left-btn").removeEventListener("click", toggleDisplay)
    }

    // toggle the artwork display
    document.querySelector(".viewport").classList.toggle("display");
    
    // show the message
    document.querySelector(".create-info").classList.toggle("hide");

}
//------------------------------------
function toggleName(){
    document.getElementById("playlist-name").classList.toggle("disappear");
    document.getElementById("input-name").classList.toggle("disappear");
}
//------------------------------------
function toggleSettings(){
    document.getElementById("settings").classList.toggle("hide");
    document.getElementById("settings-label").classList.toggle("nofocus");
}
//------------------------------------
function toggleCredits(){
    credits = !credits;
    document.querySelector("#top-right-btn").classList.toggle("disappear");
    document.querySelector("#top-left-btn").classList.toggle("disappear");
    document.querySelector("#top-mid-btn").classList.toggle("disappear");
    document.querySelector(".app").classList.toggle("hide");
    document.querySelector(".viewport").classList.toggle("hide");
    document.querySelector("#credit").classList.toggle("hide");
    document.querySelector("#toggleCredit").classList.toggle("hide");

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if(credits){
        document.querySelector("#top-left-btn").textContent ='Back';
        document.querySelector("#top-left-btn").addEventListener("click", toggleCredits)
    }   else {
        document.querySelector("#top-left-btn").textContent ='Back';
        document.querySelector("#top-left-btn").removeEventListener("click", toggleCredits)
    }
}
let credits = false;
let artDisplay = false;

//------------------------------------
// EVENT LISTENERS
//------------------------------------
// toggles
document.querySelector("#use-name-radio").addEventListener("click", function(){
    toggleName();
});
document.querySelector("#use-settings-radio").addEventListener("click", function(){
    toggleSettings();
});

document.querySelector("footer").addEventListener("click", function(){
    toggleCredits();
});
document.querySelector(".handle").addEventListener("click", function(){
    toggleCredits();
});

document.querySelector("#top-right-btn").addEventListener("click", function(){
    toggleDisplay();
});
document.querySelector(".artwork").addEventListener("click", function(){
    toggleDisplay();
});

//------------------------------------
// Fields
document.querySelector("#input-title").addEventListener("change", function() {
        updateElement("input-title", "playlist-title");
    }
);
document.querySelector("#input-title").addEventListener("keyup", function() {
        updateElement("input-title", "playlist-title");
    }
);
document.querySelector("#input-name").addEventListener("keyup", function() {
        updateElement("input-name", "playlist-name", '<span class="at-sign">@</span>');
    }
);
document.querySelector("#input-name").addEventListener("change", function() {
        updateElement("input-name", "playlist-name", '<span class="at-sign">@</span>');
    }
);
//------------------------------------
// Actions

// menu btns
let textAlignBtns = document.querySelectorAll(".options ul li");
for (let btn of textAlignBtns){
    btn.addEventListener('click', () => {
        transformElement(btn);
    });
}

let foregroundBtns = document.querySelectorAll(".options-foreground li");
for(let btn of foregroundBtns){
    btn.addEventListener('click', () => {
        foregroundOptions(btn);
    });
}

// foregrounds
let foregroundOptionBtns = document.querySelectorAll(".foreground-option");

for(let option of foregroundOptionBtns){
    option.addEventListener('click', () => {
        updateForeground(option);
    });
}
// settings

// text shadow
document.querySelector("#use-text-shadow-radio").addEventListener("click", function(){
    document.querySelector("#spacer").classList.toggle("text-shadow");
    document.querySelector("#text-shadow-label").classList.toggle("nofocus");
});

// hide at in name NEEDS TO BE FIXED
document.querySelector("#use-at-sign-radio").addEventListener("click", function(){
    // TODO - FIX HIDING AT SYMBOL
    //document.querySelector(".at-sign").classList.toggle("hide");
    document.querySelector("#at-sign-label").classList.toggle("nofocus");
});

// blur backdrop
document.querySelector("#use-blur-radio").addEventListener("click", function(){
    document.querySelector(".filter").classList.toggle("blur-backdrop");
    document.querySelector("#blur-label").classList.toggle("nofocus");
});

// inset shadow
document.querySelector("#use-inset-shadow-radio").addEventListener("click", function(){
    document.querySelector(".filter").classList.toggle("inset-shadow");
    document.querySelector("#inset-shadow-label").classList.toggle("nofocus");
});
// end settings


// Browser feature detections

// Remove blur background on firefox
if(navigator.userAgent.indexOf('Firefox') !== -1){
    console.log("Sorry, FireFox does not support backdrop-filter for all users. Blur background removed in settings.");
    document.querySelector("#settings-toggle-blur-background").classList.add("hide");
    document.querySelector("#use-blur-radio").disabled = true;
};