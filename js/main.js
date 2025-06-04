// Animación de elementos al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    // Función para animar elementos cuando son visibles
    function animateOnScroll() {
        const elements = document.querySelectorAll('.card, .section-title, .lead');
        
        elements.forEach(element => {
            // Añadir clase fade-in a todos los elementos que queremos animar
            if (!element.classList.contains('fade-in')) {
                element.classList.add('fade-in');
            }
            
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    }
    
    // Ejecutar la función al cargar la página
    animateOnScroll();
    
    // Ejecutar la función al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scroll para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Ajuste para la navbar
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Activar tooltips de Bootstrap
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

// Filtro para proyectos (para implementar en la página de proyectos)
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-item');
    
    if (category === 'all') {
        projects.forEach(project => {
            project.style.display = 'block';
        });
        return;
    }
    
    projects.forEach(project => {
        if (project.dataset.category === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// Contador para estadísticas
document.addEventListener('DOMContentLoaded', function() {
    // Solo iniciar el contador si estamos en la página que tiene los contadores
    if (document.querySelector('.counter')) {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        
        counters.forEach(counter => {
            const updateCount = () => {
                const target = parseInt(counter.innerText);
                const count = 0;
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            
            // Iniciar el contador cuando el elemento sea visible
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCount();
                    observer.disconnect();
                }
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
});

// Mejorar la función de filtro de proyectos
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-item');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Actualizar botones activos
    buttons.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Filtrar proyectos con animación
    projects.forEach(project => {
        project.style.transition = 'all 0.4s ease';
        
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'scale(1)';
            }, 100);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'scale(0.8)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 400);
        }
    });
}

// Validación de formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación básica
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        if (name.value.trim() === '') {
            showError(name, 'Por favor ingresa tu nombre');
            isValid = false;
        } else {
            removeError(name);
        }
        
        if (email.value.trim() === '') {
            showError(email, 'Por favor ingresa tu email');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Por favor ingresa un email válido');
            isValid = false;
        } else {
            removeError(email);
        }
        
        if (message.value.trim() === '') {
            showError(message, 'Por favor ingresa tu mensaje');
            isValid = false;
        } else {
            removeError(message);
        }
        
        if (isValid) {
            // Aquí iría el código para enviar el formulario
            // Por ahora solo mostramos un mensaje de éxito
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.innerText = '¡Mensaje enviado con éxito! Te contactaré pronto.';
            contactForm.appendChild(successMessage);
            
            // Limpiar el formulario
            contactForm.reset();
            
            // Eliminar el mensaje después de 5 segundos
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }
    });
}

function showError(input, message) {
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector('.invalid-feedback') || document.createElement('div');
    
    if (!formControl.querySelector('.invalid-feedback')) {
        errorMessage.className = 'invalid-feedback';
        formControl.appendChild(errorMessage);
    }
    
    input.className = 'form-control is-invalid';
    errorMessage.innerText = message;
}

function removeError(input) {
    input.className = 'form-control';
    const errorMessage = input.parentElement.querySelector('.invalid-feedback');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}