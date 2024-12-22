const sectionsWrapper = document.querySelector('.sections-wrapper');
const slider = document.querySelector('.slider');
const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.section'); // Должны быть элементы, которые прокручиваются внутри .sections-wrapper

// Обработчик прокрутки для обновления ползунка и вкладок
sectionsWrapper.addEventListener('scroll', () => {
    const scrollPosition = sectionsWrapper.scrollLeft;
    const width = sectionsWrapper.offsetWidth;

    // Обновление положения ползунка
    const sliderPosition = (scrollPosition / width) * 100;
    slider.style.transform = `translateX(${sliderPosition}%)`;

    // Обновление активной вкладки
    if (scrollPosition < width / 2) {
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        tabs[1].classList.add('active');
        tabs[0].classList.remove('active');
    }
});

// Обработчик клика по вкладке для прокрутки к соответствующему контейнеру
tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
        // Прокрутка контейнера до нужной позиции
        const section = sections[index];
        sectionsWrapper.scrollTo({
            left: section.offsetLeft,
            behavior: 'smooth'
        });

        // Обновление активной вкладки
        tabs.forEach(tab => tab.classList.remove('active'));
        tab.classList.add('active');

        // Убираем фокус с вкладки, чтобы не было синей рамки
        tab.blur(); // Это убирает фокус с вкладки

        // Можно также удалить outline с вкладки, если нужно
        tab.style.outline = 'none'; // Убираем outline через стиль
    });
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

document.addEventListener("DOMContentLoaded", function () {
    const uploadButton = document.getElementById("upload-button");
    const imageContainer = document.getElementById("image-container");
    const uploadedImage = document.getElementById("uploaded-image");

    // Обработчик для кнопки загрузки
    uploadButton.addEventListener("click", function () {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*"; // Только изображения

        // Когда файл выбран
        input.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    uploadedImage.src = e.target.result; // Загружаем изображение в img
                    imageContainer.style.display = "flex"; // Показываем контейнер с изображением
                    uploadButton.style.display = "none"; // Скрываем кнопку

                    // Сохраняем изображение в localStorage
                    localStorage.setItem("uploadedImage", e.target.result);
                };
                reader.readAsDataURL(file); // Читаем файл
            }
        });

        // Открыть окно выбора файла
        input.click();
    });

    // Проверяем, есть ли сохраненное изображение
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) {
        uploadedImage.src = savedImage; // Загружаем сохраненное изображение
        imageContainer.style.display = "flex"; // Показываем контейнер с изображением
        uploadButton.style.display = "none"; // Скрываем кнопку
    }
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

document.querySelectorAll('button, input, a, textarea, select, img, div, span').forEach(element => {
  element.addEventListener('focus', () => {
    element.style.outline = 'none';
  });
  element.addEventListener('blur', () => {
    element.style.outline = '';
  });
});
