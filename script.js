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


// зум

document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.getElementById("image-container");
    const uploadedImage = document.getElementById("uploaded-image");
    const sectionsWrapper = document.querySelector(".sections-wrapper");
    const tabs = document.querySelectorAll(".tab");

    let scale = 1;
    let position = { x: 0, y: 0 };
    let lastPosition = { x: 0, y: 0 };
    let isPanning = false;
    let initialTouch = { x: 0, y: 0 };
    let isHorizontalSwipe = false;
    let isSwipeThresholdReached = false;

    const SWIPE_THRESHOLD = 50; // Порог для распознавания свайпа
    const MIN_SWIPE_DISTANCE = 10; // Минимальная дистанция свайпа, чтобы считать его "серьезным"

    imageContainer.addEventListener("touchstart", (e) => {
        if (e.touches.length === 1) {
            // Начало свайпа одним пальцем (перемещение изображения)
            initialTouch.x = e.touches[0].clientX;
            initialTouch.y = e.touches[0].clientY;
            isPanning = true;
            lastPosition.x = e.touches[0].clientX - position.x;
            lastPosition.y = e.touches[0].clientY - position.y;
            isHorizontalSwipe = false; // Сброс флага для горизонтального свайпа
            isSwipeThresholdReached = false; // Сброс флага порога свайпа
        } else if (e.touches.length === 2) {
            // Масштабирование двумя пальцами
            isPanning = false;
        }
    });

    imageContainer.addEventListener("touchmove", (e) => {
        if (e.touches.length === 1 && isPanning) {
            const deltaX = e.touches[0].clientX - initialTouch.x;
            const deltaY = e.touches[0].clientY - initialTouch.y;

            if (!isHorizontalSwipe && Math.abs(deltaX) > Math.abs(deltaY)) {
                // Проверка, был ли это горизонтальный свайп
                isHorizontalSwipe = true;
            }

            if (isHorizontalSwipe) {
                position.x = deltaX + lastPosition.x; // Перемещение изображения
                updateTransform();
            }
        } else if (e.touches.length === 2) {
            // Масштабирование
            const distance = getDistance(e.touches[0], e.touches[1]);
            const newScale = Math.max(1, Math.min(scale * (distance / 200), 3));
            scale = newScale;

            const rect = imageContainer.getBoundingClientRect();
            position.x -= (rect.width / 2 - position.x) * (scale - 1);
            position.y -= (rect.height / 2 - position.y) * (scale - 1);

            updateTransform();
        }
    });

    imageContainer.addEventListener("touchend", () => {
        isPanning = false;

        // Если масштаб меньше 1, сбрасываем его до 1
        if (scale <= 1) {
            scale = 1;
            position.x = 0;
            position.y = 0;
            updateTransform();
        }

        // Проверка на свайп влево или вправо для перехода на вкладки
        if (isHorizontalSwipe && Math.abs(position.x) > SWIPE_THRESHOLD) {
            if (position.x < 0) {
                switchToNextTab(); // Переход на следующую вкладку
            } else {
                switchToPreviousTab(); // Переход на предыдущую вкладку
            }
        }
    });

    // Функция для обновления transform на изображении
    function updateTransform() {
        uploadedImage.style.transform = `translate(${position.x}px, ${position.y}px) scale(${scale})`;
    }

    // Функция для вычисления расстояния между двумя пальцами (для зума)
    function getDistance(pointA, pointB) {
        const dx = pointA.clientX - pointB.clientX;
        const dy = pointA.clientY - pointB.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Функции для переключения вкладок
    function switchToNextTab() {
        const currentScroll = sectionsWrapper.scrollLeft;
        const tabWidth = sectionsWrapper.offsetWidth;
        sectionsWrapper.scrollTo({ left: currentScroll + tabWidth, behavior: "smooth" });
        activateTab(1);
    }

    function switchToPreviousTab() {
        const currentScroll = sectionsWrapper.scrollLeft;
        const tabWidth = sectionsWrapper.offsetWidth;
        sectionsWrapper.scrollTo({ left: currentScroll - tabWidth, behavior: "smooth" });
        activateTab(0);
    }

    function activateTab(index) {
        tabs.forEach((tab, i) => {
            if (i === index) {
                tab.classList.add("active");
            } else {
                tab.classList.remove("active");
            }
        });
    }
});
