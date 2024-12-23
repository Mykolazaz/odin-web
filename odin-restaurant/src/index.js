import generateHome from './generateHome';
import generateMenu from './generateMenu';
import generateContact from './generateContact';

// Initial page load
generateHome()

// Dynamic page reloading
function clearContent() {
    content.innerHTML = ''
}

const content = document.querySelector('#content')
const homeBtn = document.querySelector('#home-btn')
const menuBtn = document.querySelector('#menu-btn')
const contactBtn = document.querySelector('#contact-btn')

homeBtn.addEventListener('click', () => {
    clearContent();
    generateHome();
})

menuBtn.addEventListener('click', () => {
    clearContent();
    generateMenu();
})

contactBtn.addEventListener('click', () => {
    clearContent();
    generateContact();
})