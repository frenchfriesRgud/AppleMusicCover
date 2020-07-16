/* 
Built by Anthony.media aka @frenchfriesRgud
Created    : 2020-07-09
Last update: 2020-07-13
*/
// Prefill
sample = [
    // "Playlist"
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
    "Lo-fi beats"
    // "Coffee jazz"
]
document.querySelector("#playlist-title").textContent = sample[Math.floor(Math.random()*sample.length)];

//------------------------------------
// GLOBALS
//------------------------------------
// Command States
let commandActive = {
    'text-align': '',
    'align-self': '',
    'foreground': '',
    'text-shadow': false,
    'branding-lock': false,
    'flip-horizontal': false,
    'flip-vertical': false
}
// View states
let views = {
    "artDisplay": false,
    "credits": false
}

// CSS Variable Control 
let root = document.documentElement;
// Use like so to update vars:
//  root.style.setProperty('--var-name', "property");

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
    root.style.setProperty("--custom-gradient", gradient);
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
// function customColor(){
    
// }
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
    artboard.setAttribute("class", "artwork flipXY " + contentID.classList[1] );
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
    let target = document.querySelector("#" + parent);
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
    views["artDisplay"] = !(views["artDisplay"]);
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

    if(views["artDisplay"]){
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
    views['credits'] = !(views['credits']);
    document.querySelector("#top-right-btn").classList.toggle("disappear");
    document.querySelector("#top-left-btn").classList.toggle("disappear");
    document.querySelector("#top-mid-btn").classList.toggle("disappear");
    document.querySelector(".app").classList.toggle("hide");
    document.querySelector(".viewport").classList.toggle("hide");
    document.querySelector("#credit").classList.toggle("hide");
    document.querySelector("#toggleCredit").classList.toggle("hide");

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if(views['credits']){
        document.querySelector("#top-left-btn").textContent ='Back';
        document.querySelector("#top-left-btn").addEventListener("click", toggleCredits)
    }   else {
        document.querySelector("#top-left-btn").textContent ='Back';
        document.querySelector("#top-left-btn").removeEventListener("click", toggleCredits)
    }
}


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
// customs 
// gradient custom 
function activateGradientDrawer(){
    // This function reveals the gradient drawer
        document.querySelector("li.gradient-custom").classList.remove("custom");
        document.querySelector("#foreground-custom-gradient .custom-label").classList.add("hide");
        document.querySelector(".custom-gradient-drawer").classList.remove("hide");
        tapCustomSwatch("gradient");
}

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
// end custom gradient

// custom color
function activateColorHex(){
    // reveal the input
    hexInput = document.querySelector("div#foreground-custom-color .custom-input-field");

    hexInput.classList.remove("hide");
    // hide label
    document.querySelector(".custom-label-color").classList.add("hide");

    colorPicker = document.querySelector(".custom-color-input");
    hexInput.value = colorPicker.value;
}
function validateColorHexCode(tryHex){
    // This function takes a hex code and validates it. Returns false if not a correct hex code
    let hexCode;
    let legal = false;

    // convert to lower case
    tryHex = tryHex.toLowerCase();

    // remove spaces
    tryHex = tryHex.replace(/\s+/g, '');

    // detect "#"
    if (tryHex[0] === "#"){
        console.log("# found at position 0");
        // remove #
        tryHex = tryHex.slice(1);
    }
    // check if it's either 3 or 6 length
    if (!(tryHex.length === 3 || tryHex.length === 6)) {
        console.log("not legal length");
        return false
    }
    
    hexadecimal = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

    // Check each letter if in hexadeciaml
    for(let letter in tryHex) {
        if(hexadecimal.includes(tryHex[letter])){
            console.log("Legal char found - "+ tryHex[letter]);
        } else {
            console.log("Illegal char found - " + tryHex[letter]);
            
            // end the function if illegal value provided
            return false
        }
    }

    if(legal){
        hexCode = tryHex;
    }
    return hexCode;
}
document.querySelector(".custom-color-input").addEventListener("change", function(){

    // document.querySelector("li .color-custom").style.background = "black";
    // modify css variable
    root.style.setProperty("--custom-color", this.value);

    // remove checkerboard from swatch
    document.querySelector("div#foreground-custom-color ul li.color-custom").classList.remove("custom");
    
    // Reveal the input
    activateColorHex();
});
// custom color label 
document.querySelector(".custom-label-color").addEventListener("click", function(){
    // Doesn't work on iOS Lol ok scrapping this
    // document.querySelector(".custom-color-input").click();
});
// end custom color
// end customs


//------------------------------------
// Settings Toggles

// text shadow
document.querySelector("#use-text-shadow-radio").addEventListener("click", function(){
    document.querySelector("#spacer").classList.toggle("text-shadow");
    document.querySelector("#text-shadow-label").classList.toggle("nofocus");
});

// @ symbol toggle 
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

// flip function
function flipForeground(direction){
    // this function takes either "horizontal" or "vertical"
    let command;

    if(direction === "horizontal"){
        command = "flip-horizontal";
        console.log("command set to horizontal");
    }
    if(direction === "vertical"){
        command = "flip-vertical";
        console.log("command set to vertical");
    }
    // execute the flip
    // store the command
    commandActive[command] = !(commandActive[command]);
    let scaleX = "scaleX(1)";
    let scaleY = "scaleY(1)";

    if(commandActive["flip-horizontal"]){
        console.log("scaleX active.");
        scaleX = "scaleX(-1)";
    } 
    if (commandActive["flip-vertical"]){
        console.log("scaleY active.");
        scaleY = "scaleY(-1)";
    }
    // modify css variable
    root.style.setProperty("--flipXY", (scaleX + " " + scaleY));
}

// flip horizontal
document.querySelector("#use-horizontal-flip-radio").addEventListener("click", function(){
    flipForeground("horizontal");
});
// flip vertical
document.querySelector("#use-vertical-flip-radio").addEventListener("click", function(){
    flipForeground("vertical");
});


// end settings



//------------------------------------
// Browser feature detections

// Remove blur background on Firefox
if(navigator.userAgent.indexOf('Firefox') !== -1){
    console.log("Sorry, FireFox does not support backdrop-filter for all users. Blur background removed in settings.");
    document.querySelector("#settings-toggle-blur-background").classList.add("hide");
    document.querySelector("#use-blur-radio").disabled = true;
};

// on load

document.querySelector("#use-name-radio").click();
document.querySelector("#use-sub-title-radio").click();
// document.querySelector("#use-branding-radio").click();