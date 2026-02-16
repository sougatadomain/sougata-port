/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
};
showMenu('nav-toggle', 'nav-menu');

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, remove show class
    navMenu.classList.remove('show');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (sectionsClass) { // check if link exists
            if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link');
            } else {
                sectionsClass.classList.remove('active-link');
            }
        }
    });
};
window.addEventListener('scroll', scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    // reset: true // uncomment if you want animation to repeat on scroll
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', {delay: 400}); 
sr.reveal('.home__social-icon', {interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input', {interval: 200}); 

/*==================== CONTACT FORM ====================*/
const form = document.getElementById('contactForm');
const button = document.getElementById('contactButton');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent default form submission

    // Basic validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
        alert('Please fill all fields!');
        return;
    }

    // Prepare data
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            // Show success feedback
            button.classList.add('success');
            button.textContent = '✔ Message sent successfully';

            // Reset form after 3 seconds
            setTimeout(() => {
                button.classList.remove('success');
                button.textContent = 'Send';
                form.reset();
            }, 3000);
        } else {
            alert('Something went wrong. Please try again!');
        }
    } catch (error) {
        console.error(error);
        alert('Error sending message!');
    }
});
