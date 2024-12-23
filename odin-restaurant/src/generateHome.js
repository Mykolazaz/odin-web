function generateHome() {
    const content = document.querySelector('#content')

    const section = document.createElement('div')
    section.classList.add('home')
    section.setAttribute('id','home')

    const h1 = document.createElement('h1')
    h1.classList.add('hero-heading')
    h1.textContent =  'Welcome to the Restaurant'
    section.appendChild(h1)

    const h3 = document.createElement('h3')
    h3.classList.add('hero-subheading')
    h3.textContent =  'Established in 2023'
    section.appendChild(h3)

    const img = document.createElement('img')
    img.src = "images/photo-restaurant.webp"
    section.appendChild(img)

    content.appendChild(section)
}

export default generateHome