const toggleButtons = document.getElementsByClassName('open');
const navCloseButtons = document.getElementsByClassName('close'); 
const navLinks = document.querySelector('ul');

if (toggleButtons.length > 0 && navCloseButtons.length > 0) {
    const toggleButton = toggleButtons[0];
    const navCloseButton = navCloseButtons[0];

    toggleButton.classList.add('toggle');
    document.querySelector('nav').insertBefore(toggleButton, document.querySelector('nav ul'));

    toggleButton.addEventListener('click', () => {
        navLinks.classList.add('active');
    });

    navCloseButton.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
}

window.addEventListener('resize', () => {
    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetElement = document.querySelector(this.getAttribute('href'));
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; 
    let start = null;

    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const stepScroll = Math.min(progress / duration, 1);

      window.scrollTo(0, startPosition + distance * easeInOutCubic(stepScroll));

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    });

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
  });
});


function updateScrollClasses() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');

    const middleOfPage = document.documentElement.scrollHeight / 2;

    if (window.scrollY > 50 || window.scrollY >= middleOfPage) {
        header.classList.add('scrolled');
        nav.classList.add('scroll');
    } else {
        header.classList.remove('scrolled');
        nav.classList.remove('scroll');
    }
}

window.addEventListener('scroll', updateScrollClasses);

window.addEventListener('load', updateScrollClasses);

const texts = ["Full Stack Developer", "Web Designer"];
let index = 0;
let charIndex = 0;
let currentText = "";
const typingElement = document.querySelector(".typing");

function type() {
    if (charIndex < texts[index].length) {
        currentText += texts[index].charAt(charIndex);
        typingElement.textContent = currentText;
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(deleteText, 2000);
    }
}

function deleteText() {
    if (charIndex > 0) {
        currentText = currentText.slice(0, -1);
        typingElement.textContent = currentText;
        charIndex--;
        setTimeout(deleteText, 50);
    } else {
        index = (index + 1) % texts.length;
        setTimeout(type, 500);
    }
}

type();

document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', () => {
        const projectItem = button.closest('.project-item');
        projectItem.classList.toggle('active');
        button.textContent = projectItem.classList.contains('active') ? 'Read Less' : 'Read More';
    });
});

function sentMail(event){
    event.preventDefault(); 
    var params ={
    name : document.getElementById('name').value,
    email : document.getElementById('email').value,
    subject : document.getElementById('subject').value,
    message : document.getElementById('message').value,
    }
    
    emailjs.send('service_o1qb49g', 'template_8e0uuzy', params).then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('subject').value = ''; 
        document.getElementById('message').value = ''; 
        alert("Email sent")
    }, (error) => {
        console.error('FAILED...', error);
    });
};




