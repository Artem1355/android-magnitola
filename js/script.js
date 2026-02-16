// Простая анимация появления при скролле
const elements = document.querySelectorAll('.card, .gallery img, h2');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
});

elements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease";
    observer.observe(el);
});

// Форма (пока заглушка)
document.getElementById('contactForm').addEventListener('submit', function(e){
    e.preventDefault();
    alert("Заявка отправлена! Мы свяжемся с вами.");
});
