// Настройки вашего Telegram бота
const TELEGRAM_TOKEN = '8714484388:AAHB8FHwTkaNkeicDA_0M4syYauxDooTt5g';
const TELEGRAM_CHAT_ID = '6998969294';

// Функция отправки
async function sendToTelegram(formData) {
    const name = formData.get('name');
    const phone = formData.get('phone');
    const car = formData.get('car') || 'Заявка из нижней формы';

    const message = `
🚀 *НОВАЯ ЗАЯВКА - IDEALAUTO*
👤 *Имя:* ${name}
📞 *Телефон:* ${phone}
🚗 *Авто:* ${car}
    `;

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        if (response.ok) {
            alert('Спасибо! Заявка в IDEALAUTO принята, мы скоро свяжемся с вами.');
        } else {
            alert('Ошибка отправки. Пожалуйста, позвоните нам.');
        }
    } catch (error) {
        alert('Сервер недоступен. Попробуйте написать в Telegram напрямую.');
    }
}

// Обработка форм
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        btn.innerText = 'Отправка...';
        btn.disabled = true;

        const formData = new FormData(form);
        await sendToTelegram(formData);

        btn.innerText = originalText;
        btn.disabled = false;
        form.reset();
        
        if (document.getElementById('modal')) {
            document.getElementById('modal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Управление модальным окном
const modal = document.getElementById('modal');
const btnOpen = document.getElementById('openModal');
const btnClose = document.getElementById('closeModal');

if (btnOpen) {
    btnOpen.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (btnClose) {
    btnClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Анимация при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .feature-card, .gallery img, h2').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
    observer.observe(el);
});