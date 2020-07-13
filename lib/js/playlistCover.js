/* 
written by @frenchfriesRgud

2020-07-09

Last update:
2020-07-13
*/
// Prefill
sample = [
    "Playlist"
    // "Mellow beats",
    // "Rainy day blues",
    // "Urban trend",
    // "Lo-fi summer",
    // "Winter mood",
    // "Sunset vibes"
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

let commandActive = {
    'text-align': '',
    'align-self': '',
    'foreground': '',
    'text-shadow': '',
    'branding-lock': false
}

//------------------------------------
// MODIFICATION
//------------------------------------
function customGradient(){
    // This function activates the custom gradient panel
    console.log("customGradient() running");
    let gradient;
    let degree = defaultGradientDegree + "deg";
    let colorOne = document.querySelector("#custom-gradient-color-1").value;
    let colorTwo = document.querySelector("#custom-gradient-color-2").value;

    // build the gradient 
    gradient = "linear-gradient(" + degree + ", " + colorOne + " 0%, " + colorTwo + " 100%)"
    
    // modify css variable
    document.documentElement.style.cssText = "--custom-gradient:" + gradient + ";";
    //document.documentElement.style.cssText = "--custom-gradient-webkit:" + gradient + ";";
}
//------------------------------------
function inverseCustomGradient(){
    // This function swaps the gradient color input swatches
    let colorOne = document.querySelector("#custom-gradient-color-1");
    let colorTwo = document.querySelector("#custom-gradient-color-2");
    let temp = colorOne.value;

    colorOne.value = colorTwo.value;
    colorTwo.value = temp;
}
function tapCustomSwatch(category){
    // This function will click the custom button of any category passed
    // takes the string of the category, pass either 'gradient', 'color' or 'image'
    let customSelector = "li." + category + "-custom";
    document.querySelector(customSelector).click();
}
//------------------------------------
function updateForeground(contentID){
    // This function takes the element of the clicked swatch and 
    // sets the artboard to have that class so it gets the background

    // get the artboard
    artboard = document.querySelector("#artwork");

    // unselect the existing swatch
    document.querySelector(".foreground-choices .foreground-group ul .foreground-active").classList.remove("foreground-active");

    // set the selected swatch as active
    contentID.classList.add("foreground-active");

    // set the artboard to the class of the clicked swatch
    artboard.setAttribute("class", "artwork " + contentID.classList[1]);
    // second class in the list added because its always the foreground background
    console.log("Setting class to "+contentID.classList[1]);

}
//------------------------------------
function updateElement(contentID, destinationID, prefix) {
    // This function replaces the text value of the destination
    // with the value of the provided contentID element
    // Takes the input element and desitination selector
    value = document.querySelector("#"+contentID).value;
    document.querySelector("#"+destinationID).textContent = value;
    
    // TODO --- FIX HIDING THE ADD SYMBOL
    if(prefix){
    }
}
//------------------------------------
function transformElement(trigger){
    // This function controls the positioning of the text elements
    // inside the artboard

    // get the data from the custom data attributes of the alignment btns
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

//------------------------------------
// MENUS
//------------------------------------
function menuState(type, active){
    // This function enables the menu btns

    // remove the active state from the menu
    document.querySelector(".options-"+type+" .active").classList.remove("active");
    // set this class to active
    active.classList.add("active");
}
//------------------------------------
function foregroundOptions(category){
    // This function toggles the different foreground palettes 

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
    // This function shows/hides the display view
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
    // This function shows/hides the playlist author
    document.getElementById("playlist-name").classList.toggle("hide");
    document.getElementById("input-name").classList.toggle("hide");
    document.querySelector(".label-name").classList.toggle("nofocus");
}
//------------------------------------
function toggleSubTitle(){
    // This function shows/hides the playlist sub
    document.querySelector(".sub-title").classList.toggle("hide");
    document.querySelector("#input-sub-title").classList.toggle("hide");
    document.querySelector(".label-sub-title").classList.toggle("nofocus");
}
//------------------------------------
function toggleBranding(){
    // This function shows/hides the branding
    document.querySelector("#am-logo").classList.toggle("hide");
    document.querySelector(".label-branding").classList.toggle("nofocus");
}
//------------------------------------
function toggleSettings(){
    // This function shows/hides the settings panel
    document.getElementById("settings").classList.toggle("hide");
    document.getElementById("settings-toggle-group").classList.toggle("nofocus");
    // document.getElementById("settings-label").classList.toggle("use-settings-radio");
}
//------------------------------------
function toggleCredits(){
    // This function shows/hides the Credits view
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
document.querySelector("#use-sub-title-radio").addEventListener("click", function(){
    toggleSubTitle();
});
document.querySelector("#use-branding-radio").addEventListener("click", function(){
    toggleBranding();
});
document.querySelector("#settings-toggle-group").addEventListener("click", function(){
    toggleSettings();
});

document.querySelector("footer").addEventListener("click", function(){
    toggleCredits();
});
document.querySelector("#header-logo").addEventListener("click", function(){
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

// name
document.querySelector("#input-name").addEventListener("keyup", function() {
        updateElement("input-name", "playlist-name-text", '@');
    }
);
document.querySelector("#input-name").addEventListener("change", function() {
        updateElement("input-name", "playlist-name-text", '@');
    }
);
// title
document.querySelector("#input-title").addEventListener("change", function() {
        updateElement("input-title", "playlist-title");
    }
);
document.querySelector("#input-title").addEventListener("keyup", function() {
        updateElement("input-title", "playlist-title");
    }
);
// subtitle
document.querySelector("#input-sub-title").addEventListener("change", function() {
        updateElement("input-sub-title", "playlist-sub-title");
    }
);
document.querySelector("#input-sub-title").addEventListener("keyup", function() {
        updateElement("input-sub-title", "playlist-sub-title");
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
function activateGradientDrawer(){
        document.querySelector("li.gradient-custom").classList.remove("custom");
        document.querySelector("#foreground-custom-gradient .custom-label").classList.add("hide");
        document.querySelector(".custom-gradient-drawer").classList.remove("hide");
        tapCustomSwatch("gradient");
}
// customs 
// gradient custom 
document.querySelector("li.gradient-custom").addEventListener("click", function(){
    activateGradientDrawer();
});
// label activate
document.querySelector("#foreground-custom-gradient .custom-label").addEventListener("click", function(){
    activateGradientDrawer();
})
// gradient inverse
document.querySelector("#gradient-inverse").addEventListener("click", function(){
    inverseCustomGradient();
    customGradient();
    tapCustomSwatch("gradient");
});

let defaultGradientDegree = 90;

document.querySelector("#gradient-direction").addEventListener("click", function(){
    this.classList.toggle("ri-arrow-right-line");
    this.classList.toggle("ri-arrow-down-line");

    // change the direction
    if(defaultGradientDegree === 90){
        defaultGradientDegree = 180;
    } else {
        defaultGradientDegree = 90;
    }
    customGradient();
    tapCustomSwatch("gradient");
    // alert("fdg")
});
// onchange update variables
document.querySelector("#custom-gradient-color-1").addEventListener("change", function(){
    customGradient();
});
document.querySelector("#custom-gradient-color-2").addEventListener("change", function(){
    customGradient();
});
// end customs
// settings

// text shadow
document.querySelector("#use-text-shadow-radio").addEventListener("click", function(){
    document.querySelector("#spacer").classList.toggle("text-shadow");
    document.querySelector("#text-shadow-label").classList.toggle("nofocus");
});


let atSignAllowed = true;

document.querySelector("#use-at-sign-radio").addEventListener("click", function(){
    atSignAllowed = !atSignAllowed;
    console.log("atSignAllowed set to " + atSignAllowed);
    document.querySelector(".at-sign").classList.toggle("hide");
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

// on load

// document.querySelector("#use-name-radio").click();
// document.querySelector("#use-sub-title-radio").click();
document.querySelector("#use-branding-radio").click();