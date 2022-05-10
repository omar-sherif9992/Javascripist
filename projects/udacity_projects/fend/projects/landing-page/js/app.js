/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.getElementsByTagName("section");
const menu = document.getElementById('navbar__list');


/**
 * End Global Variables
 * Start Helper Functions
 *
*/
//stack overflow
function isScrolledIntoView(el) {
    let rect = el.getBoundingClientRect();
    let elemTop = rect.top;
    let elemBottom = rect.bottom;

    // Only completely visible elements return true:
    let isVisible =  (rect.top>0&&rect.top<300);
    return isVisible;
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/
function buildNav() {
    let i=0;
    for (let section of sections) {
        const listItem = document.createElement('li');
        const listItemLink = document.createElement('a');
        listItemLink.setAttribute("class","menu__link");
        listItemLink.textContent = section.dataset.nav;
        listItemLink.setAttribute("id",("nav"+i));
        i+=1;
   
        listItem.appendChild(listItemLink);
        menu.appendChild(listItem);
    }
}



// build the nav
buildNav();





// Scroll to anchor ID using scrollTO event with smooth behavior
const navList = document.getElementsByTagName('a'); // navlist that contains the anchor tags

[...navList].forEach((elem, index) => {
    elem.addEventListener("click", (e) => {
        e.preventDefault();


        let destination = sections[index];
        destination.scrollIntoView({
            behavior: 'smooth'
        });


    }
    )
})



// Add class 'active' to section when near top of viewport
//and adding active state in anchor tag
document.addEventListener("scroll", () => {
    [...sections].forEach((elem, index) => {
        elem=document.getElementById("section"+(index+1));
        let flag = isScrolledIntoView(elem);
        let i = index + 1;
        let nav = document.getElementById("nav"+index);

        if (flag) {
            //style added for active states
            nav.classList.contains("clicked") ? null : nav.classList.add("clicked");
            elem.classList.contains("your-active-class") ? null : elem.classList.add("your-active-class");
            console.log(nav.classList.contains("clicked"))
        }

        else {
            if (nav.classList.contains("clicked")) {
                nav.classList.remove("clicked");
            }
            elem.classList.contains("your-active-class") ? elem.classList.remove("your-active-class") : null;
        }
    })
}) 

   
