

var COUNT_NEXT_PREVIOUS = 0


// window.onclick = function (event) {
//     let modal                   = document.getElementById('modal-content')
//     let body                    = document.body
//     if (event.target == modal) {
//         toggleModal()
//     }
// }








//      [ Change menu function ]

function changeMenu(menu) {
    let card_home       = document.getElementById(`content-home`)
    let card_resume     = document.getElementById(`content-resume`)
    let card_portfolio  = document.getElementById(`content-portfolio`)
    let card_contact    = document.getElementById(`content-contact`)

    let btn_home        = document.getElementById(`nav-item-home`)
    let btn_resume      = document.getElementById(`nav-item-resume`)
    let btn_portfolio   = document.getElementById(`nav-item-portfolio`)
    let btn_contact     = document.getElementById(`nav-item-contact`)

    card_home.style.display         = 'none'
    card_resume.style.display       = 'none'
    card_portfolio.style.display    = 'none'
    card_contact.style.display      = 'none'

    btn_home.style.color        = ''
    btn_resume.style.color      = ''
    btn_portfolio.style.color   = ''
    btn_contact.style.color     = ''

    let color = '#ffc500'
    let title = ''
    title                           = menu

    switch (menu) {
        case 'home'     : { 
            card_home.style.display         = 'flex'
            btn_home.style.color            = color
        }
            break
        case 'resume'   : { 
            card_resume.style.display       = 'flex'
            btn_resume.style.color          = color
        }
            break
        case 'portfolio': { 
            card_portfolio.style.display    = 'flex'
            btn_portfolio.style.color       = color
        }
            break
        case 'contact'  : { 
            card_contact.style.display      = 'flex'
            btn_contact.style.color         = color
        }
            break
        default:
            break
    }
    titleSetter(title)
}






//      [Toggle dark theme]

function toggleDarkMode(check) {
    let container_btn   = document.getElementById('container-nav')
    if (check.checked === true) {
        localStorage.setItem('dark-mode', 'dark')
        container_btn.className = 'container-nav'
        toggleClass()
    } 
    if (check.checked === false) {
        let border_left = '0'
        localStorage.setItem('dark-mode', 'light')
        container_btn.className = 'container-nav card'
        toggleClass()
    }
}


function toggleClass() {
    // Body
    let body            = document.body
    body.classList.toggle('dark-mode')



    // Button
    let btn_home        = document.getElementById(`nav-item-home`)
    let btn_resume      = document.getElementById(`nav-item-resume`)
    let btn_portfolio   = document.getElementById(`nav-item-portfolio`)
    let btn_contact     = document.getElementById(`nav-item-contact`)
    btn_home.classList.toggle('btn-dark')
    btn_resume.classList.toggle('btn-dark')
    btn_portfolio.classList.toggle('btn-dark')
    btn_contact.classList.toggle('btn-dark')



    // Cards
    let card        = document.getElementById('card-left')
    card.classList.toggle('card-dark')

    HOBBY[LANG]['content'].forEach((ele, i) => {
        document.getElementById(`card-hobby-${i}`).classList.toggle('card-dark-sub')
    })

    TOOLS[LANG]['content_tools'].forEach((ele, i) => {
        document.getElementById(`card-tools-${i}`).classList.toggle('card-dark-sub')
    })

    PORT[LANG]['content'].forEach((ele, i) => {
        document.getElementById(`card-port-${i}`).classList.toggle('card-dark-sub')
        document.getElementById(`container-port-img-${i}`).classList.toggle('card-dark-sub-2')
    })
    
    EXP[LANG]['content'].forEach((ele, i) => {
        document.getElementById(`card-exp-${i}`).classList.toggle('card-dark-sub')
    })



    // Content
    let content_home    = document.getElementById('content-home')
    let content_resume  = document.getElementById('content-resume')
    let content_port    = document.getElementById('content-portfolio')
    let content_contact = document.getElementById('content-contact')
    content_home.classList.toggle('content-dark')
    content_resume.classList.toggle('content-dark')
    content_port.classList.toggle('content-dark')
    content_contact.classList.toggle('content-dark')

    let modal = document.getElementById(`container-modal`)
    modal.classList.toggle('content-dark')
}





//      [Language switcher] TH/EN

function langSwitcher(lang) {
    localStorage.setItem('lang', lang)
    location.reload()
}






//      [Toggle Modals]

async function toggleModal(content_length) {
    let content_index   = content_length
    let content         = await templateModal(content_index)
    let body            = document.body
    let modal           = document.getElementById('container-modal')
    let main            = document.getElementById('container-main')
    COUNT_NEXT_PREVIOUS = 0
    
    if (modal.style.display == 'block') {
        modal.style.display         = 'none'
        body.style.overflowY        = 'scroll'
        main.style.filter           = 'none'
    } else {
        modal.innerHTML             = content
        modal.style.display         = 'block'
        body.style.overflow         = 'hidden'
        main.style.filter           = 'blur(10px)'
    }
}






//      [Image slideshow]

function nextImage() {
    let length = LENGTH_MAX
    onResetZoom(length)
    COUNT_NEXT_PREVIOUS += 1
    if (COUNT_NEXT_PREVIOUS > length - 1) {
        COUNT_NEXT_PREVIOUS = 0
        document.getElementById(`modal-remain-count`).innerText = COUNT_NEXT_PREVIOUS + 1
        document.getElementById(`modal-img-0`).style.display = 'block'
    } else {
        document.getElementById(`modal-remain-count`).innerText = COUNT_NEXT_PREVIOUS + 1
        document.getElementById(`modal-img-${COUNT_NEXT_PREVIOUS}`).style.display = 'block'
    }
}


function previousImage() {
    let length = LENGTH_MAX
    onResetZoom(length)
    COUNT_NEXT_PREVIOUS -= 1
    if (COUNT_NEXT_PREVIOUS < 0) {
        COUNT_NEXT_PREVIOUS = length - 1
        document.getElementById(`modal-remain-count`).innerText = COUNT_NEXT_PREVIOUS + 1
        document.getElementById(`modal-img-${length - 1}`).style.display = 'block'
    } else {
        document.getElementById(`modal-remain-count`).innerText = COUNT_NEXT_PREVIOUS + 1
        document.getElementById(`modal-img-${COUNT_NEXT_PREVIOUS}`).style.display = 'block'
    }
}




function onKeyDown(event) {
    switch (event.keyCode) {
        case 39: nextImage()
            break
        case 37: previousImage()
            break
        default:
            break
    }
}




function onZoom() {
    if (window.innerWidth <= 1100) {
        let imgContainer = document.getElementById(`modal-content-img`)
        if (imgContainer.style.width == '1280px') {
            imgContainer.style.width = 'auto'
        } else {
            imgContainer.style.width = '1280px'
        }
    }
}




function onResetZoom(length) {
    document.getElementById(`modal-content-img`).style.width = 'auto'
    for (let i = 0; i < length; i++) {
        document.getElementById(`modal-img-${i}`).style.display = 'none'
    }
}