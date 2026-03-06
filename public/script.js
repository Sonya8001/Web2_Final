// Make navbar sticky after scrolling past the header name
const header = document.querySelector('.site-header');
const nav = document.getElementById('navbar');
const nameEl = document.querySelector('.name');

function handleScroll() {
    const nameBottom = nameEl.getBoundingClientRect().bottom;
    if (nameBottom <= 0) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
}

window.addEventListener('scroll', handleScroll);

// Like feature with cookie persistence
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

function setCookie(name, value) {
    document.cookie = name + '=' + value + '; max-age=31536000; path=/';
}

const photo = document.getElementById('likeable-photo');
const likeCountEl = document.getElementById('like-count');

let likes = parseInt(getCookie('photo_likes')) || 0;
likeCountEl.textContent = likes;

photo.addEventListener('click', function(e) {
    likes++;
    likeCountEl.textContent = likes;
    setCookie('photo_likes', likes);

    const rect = photo.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const heart = document.createElement('div');
    heart.className = 'heart-burst pop';
    heart.textContent = '\u2764';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    photo.appendChild(heart);

    heart.addEventListener('animationend', () => heart.remove());
});

// Scroll indicators -> scroll to next section
document.querySelectorAll('.scroll-indicator').forEach(indicator => {
    indicator.style.cursor = 'pointer';
    indicator.addEventListener('click', function() {
        const currentSection = this.closest('section');
        const nextSection = currentSection.nextElementSibling;
        if (nextSection && nextSection.tagName === 'SECTION') {
            const navHeight = nav.offsetHeight;
            const top = nextSection.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// Smooth scroll for nav buttons
document.querySelectorAll('.nav span[data-target]').forEach(btn => {
    btn.addEventListener('click', function() {
        const target = document.getElementById(this.dataset.target);
        if (target) {
            const navHeight = nav.offsetHeight;
            const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

