
        function showPage(pageId) {
            // Скрыть все страницы
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));
            
            // Показать выбранную страницу
            document.getElementById(pageId).classList.add('active');
            
            // Обновить активную ссылку в навигации
            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(link => link.classList.remove('active'));
            event.target.classList.add('active');
            
            // Закрыть мобильное меню если оно открыто
            document.querySelector('.nav-menu').classList.remove('active');
            
            // Прокрутить страницу наверх
            window.scrollTo(0, 0);
            
            // Если переключились на страницу инфраструктуры, инициализировать карту
            if (pageId === 'infrastructure') {
                setTimeout(initializeMap, 100);
            }
        }

        function toggleMobileMenu() {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.toggle('active');
        }

        function submitForm(event) {
            event.preventDefault();
            
            // Простая валидация
            const form = event.target;
            const formData = new FormData(form);
            
            // Проверка обязательных полей
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'var(--secondary-color)';
                    isValid = false;
                } else {
                    field.style.borderColor = '#27ae60';
                }
            });
            
            if (isValid) {
                alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
                form.reset();
            } else {
                alert('Пожалуйста, заполните все обязательные поля.');
            }
        }

        // Инициализация карты
        let map;
        let mapInitialized = false;

        function initializeMap() {
            if (mapInitialized) return;
            
            const mapElement = document.getElementById('map');
            if (!mapElement) return;
            
            try {
                const donetsk = [48.002, 37.805];
                map = L.map('map').setView(donetsk, 12);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                L.marker(donetsk).addTo(map)
                    .bindPopup('Донецк')
                    .openPopup();
                
                mapInitialized = true;
                
                // Принудительное обновление размеров карты
                setTimeout(() => {
                    map.invalidateSize();
                }, 250);
            } catch (error) {
                console.error('Ошибка инициализации карты:', error);
            }
        }

        // Добавляем обработчики событий
        document.addEventListener('DOMContentLoaded', function() {
            // Анимация элементов при скролле
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Наблюдаем за картами и другими элементами
            document.querySelectorAll('.card, .culture-card, .info-card').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        });

        // Закрытие мобильного меню при клике вне него
        document.addEventListener('click', function(event) {
            const navMenu = document.querySelector('.nav-menu');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            
            if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });

        // Плавная прокрутка для якорных ссылок
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
