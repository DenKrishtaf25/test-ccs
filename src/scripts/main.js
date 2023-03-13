const header = document.querySelector('#header')
let scrollpos = window.scrollY
const scrollChange = 1

const add_class_on_scroll = () => header.classList.add("scroling")
const remove_class_on_scroll = () => header.classList.remove("scroling")
window.addEventListener('scroll', function () {
    scrollpos = window.scrollY;
    if (scrollpos >= scrollChange) {
        add_class_on_scroll()
    } else {
        remove_class_on_scroll()
    }
})

//mobile nav
const body = document.querySelector('body')
const burger = document.querySelector('.burger')
const mobNav = document.querySelector('.mob-navigation')
const mobItems = document.querySelector('.mob-navigation__item')
burger.addEventListener('click', () => {
    mobNav.classList.toggle('active')
    body.classList.toggle('hidden')
    burger.classList.toggle('opened')
    if (scrollpos >= scrollChange || mobNav.classList.contains('active')) {
        add_class_on_scroll()
    }
})
// form
const selection = document.querySelector('.form__selection')
const selected = document.querySelector('.form__selection-selected')
const selectedTxt = document.querySelector('.form__selection-selected span')
const options = document.querySelectorAll('.option')
const range = document.querySelector('#range')
const value = document.querySelector("#value")

selected.addEventListener('click', () => {
    selection.classList.toggle('active')
})
options.forEach(option => {
    option.addEventListener('click', () => {
        selectedTxt.innerHTML = option.querySelector("label").innerHTML
        selection.classList.remove('active')
    })
})

range.addEventListener("input", (event) => {
    value.textContent = event.target.value
})
