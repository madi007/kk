const sectionsWrapper = document.querySelector('.sections-wrapper');
const slider = document.querySelector('.slider');
const tabs = document.querySelectorAll('.tab');

sectionsWrapper.addEventListener('scroll', () => {
    const scrollPosition = sectionsWrapper.scrollLeft;
    const width = sectionsWrapper.offsetWidth;

    // Ползунок
    const sliderPosition = (scrollPosition / width) * 100;
    slider.style.transform = `translateX(${sliderPosition}%)`;

    // Активные вкладки
    if (scrollPosition < width / 2) {
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        tabs[1].classList.add('active');
        tabs[0].classList.remove('active');
    }
});

const sendBtn = document.querySelector('.footer-btn.present-btn');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-modal-btn');
const randomCodeElement = document.querySelector('.random-code');

// Функция для генерации случайного 6-значного кода
function generateRandomCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Показ модального окна
function showModal() {
    randomCodeElement.textContent = generateRandomCode();
    modal.classList.remove('hidden');
    modal.classList.add('visible');
}

// Скрытие модального окна
function hideModal() {
    modal.classList.remove('visible');
    modal.classList.add('hidden');
}

// Обработчики событий
sendBtn.addEventListener('click', showModal);
closeModalBtn.addEventListener('click', hideModal);

// Закрытие модального окна по клику вне его (опционально)
document.addEventListener('click', (e) => {
    if (modal.classList.contains('visible') && !modal.contains(e.target) && !sendBtn.contains(e.target)) {
        hideModal();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const uploadButton = document.getElementById('upload-button');
    const imageContainer = document.getElementById('image-container');
    const uploadedImage = document.getElementById('uploaded-image');

    // Обработчик длякнопки загрузки
    uploadButton.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*'; // Только изображения

        // Когда файл выбран
        input.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    uploadedImage.src = e.target.result; // Загружаем изображение в img
                    imageContainer.style.display = 'flex'; // Показываем контейнер с изображением
                    uploadButton.style.display = 'none'; // Скрываем кнопку
                    document.body.style.overflow = 'hidden'; // Отключаем прокрутку страницы
                };
                reader.readAsDataURL(file); // Читаем файл
            }
        });

        // Открыть окно выбора файла
        input.click();
    });

    // Реализация зума с помощью колеса мыши (для ПК)
    let scale = 1;

    uploadedImage.addEventListener('wheel', function(e) {
        e.preventDefault(); // Предотвращаем зум всего сайта
        if (e.deltaY < 0) {
            scale *= 1.1; // Приближаем
        } else {
            scale /= 1.1; // Отдаляем
        }

        uploadedImage.style.transform = `scale(${scale})`;
    });

    // Реализация зума для мобильных устройств (с помощью жестов pinch-to-zoom)
    let startDistance = 0;
    let currentScale = 1;

    imageContainer.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) {
            // Вычисляем начальное расстояние между пальцами
            startDistance = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );
        }
    });

    imageContainer.addEventListener('touchmove', function(e) {
        if (e.touches.length === 2) {
            // Вычисляем текущее расстояние между пальцами
            const endDistance = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );

            // Если расстояние изменилось, зумируем изображение
            if (startDistance > 0) {
                const scaleChange = endDistance / startDistance;
                currentScale *= scaleChange;

                // Ограничиваем масштаб
                currentScale = Math.min(Math.max(currentScale, 1), 3); // Меньше 1 и больше 3 нельзя

                uploadedImage.style.transform = `scale(${currentScale})`;
                startDistance = endDistance; // Обновляем начальное расстояние для следующего шага
            }
        }
    });

    // Закрытие изображения
    imageContainer.addEventListener('click', function() {
        imageContainer.style.display = 'none'; // Скрыть контейнер с изображением
        uploadButton.style.display = 'block'; // Показать кнопку загрузки
        document.body.style.overflow = 'auto'; // Включаем прокрутку страницы снова
        scale = 1; // Сбросить масштаб
        uploadedImage.style.transform = 'scale(1)'; // Сбросить масштаб изображения
    });
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('Service Worker зарегистрирован'))
    .catch((err) => console.log('Ошибка регистрации Service Worker:', err));
}


// Проверка сохранённых данных
        document.addEventListener('DOMContentLoaded', () => {
            const fields = ['fio', 'iin', 'birthdate', 'docNumber', 'issueDate', 'expiryDate'];
            const saveButton = document.getElementById('saveButton');
            let isSaved = localStorage.getItem('isSaved');
            
            if (isSaved === 'true') {
                fields.forEach(field => {
                    let input = document.getElementById(field);
                    input.value = localStorage.getItem(field);
                    input.classList.add('readonly');
                });
                saveButton.style.display = 'none'; // Скрыть кнопку
            }
        });

        // Сохранение данных
        document.getElementById('saveButton').addEventListener('click', () => {
            const fields = ['fio', 'iin', 'birthdate', 'docNumber', 'issueDate', 'expiryDate'];
            const saveButton = document.getElementById('saveButton');
            let allFilled = fields.every(field => document.getElementById(field).value.trim() !== '');

            if (allFilled) {
                fields.forEach(field => {
                    const input = document.getElementById(field);
                    localStorage.setItem(field, input.value);
                    input.classList.add('readonly'); // Применяем стили для отображения текста
                });
                localStorage.setItem('isSaved', 'true');
                saveButton.style.display = 'none'; // Скрыть кнопку
                alert('Данные успешно сохранены!');
            } else {
                alert('Пожалуйста, заполните все поля.');
            }
        });
