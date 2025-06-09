document.addEventListener("DOMContentLoaded", function() {
  const educationData = [
    {
      title: "Scrum Foundation Professional Certificate",
      imageUrl: "image/certificados/cert-scrum.jpg",
    },
    {
      title: "Google Cloud Computing",
      imageUrl: "image/certificados/cert-googlecloud.PNG",
    },
    {
      title: "Microsoft Certified: Azure Fundamentals",
      imageUrl: "image/certificados/cert-azure.jpg",
    },
    {
      title: "Data Analytics",
      imageUrl: "image/certificados/data analytics.jpg",
    },
    {
      title: "SQL Server for Analytics",
      imageUrl: "image/certificados/sql analytics.jpg",
    },
    {
      title: "Microsoft Power BI",
      imageUrl: "image/certificados/powerbi.jpg",
    },
    {
      title: "Python: Analisis de datos",
      imageUrl: "image/certificados/python analisis.jpg",
    },
    {
      title: "Python Avanzado: Machine Learning",
      imageUrl: "image/certificados/python avanzando.jpg",
    },
    {
      title: "Diplomado en Inteligencia y analisis de datos",
      imageUrl: "image/certificados/diplomado-analisisdatos.jpg",
    },
  ];

  const educationTimeline = document.getElementById("education-timeline");
  const certificatePreview = document.getElementById("certificate-preview");
  const certificateModal = document.getElementById("certificate-modal");
  const certificateModalImg = document.getElementById("certificate-modal-img");
  const certificateModalClose = document.querySelector(".certificate-modal-close");

  if (educationTimeline && certificatePreview) {
    educationData.forEach((education, idx) => {
      const item = document.createElement("li");
      item.className = "timeline-item";
      item.innerHTML = `
        <span class="timeline-title" tabindex="0">${education.title}</span>
        <span class="timeline-dot"></span>
      `;

      // Hover (miniatura)
      item.addEventListener("mouseenter", () => {
        document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        certificatePreview.innerHTML = `
          <img src="${education.imageUrl}" alt="${education.title}" class="certificate-mini">
          <div class="certificate-label">${education.title}</div>
        `;
      });
      item.addEventListener("mouseleave", () => {
        item.classList.remove('active');
        certificatePreview.innerHTML = "";
      });

      // Click (modal grande)
      item.querySelector('.timeline-title').addEventListener("click", (e) => 
        
        {
        certificateModal.style.display = "flex";
        certificateModalImg.src = education.imageUrl;
        certificateModalImg.alt = education.title;
        document.body.style.overflow = "hidden";
        e.stopPropagation();
      });

      // Click (modal grande) en el dot
      item.querySelector('.timeline-dot').addEventListener("click", (e) => {
        certificateModal.style.display = "flex";
        certificateModalImg.src = education.imageUrl;
        certificateModalImg.alt = education.title;
        document.body.style.overflow = "hidden";
        e.stopPropagation();
      });

      // Teclado: Enter/Space abre modal también
      item.querySelector('.timeline-title').addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          certificateModal.style.display = "flex";
          certificateModalImg.src = education.imageUrl;
          certificateModalImg.alt = education.title;
          document.body.style.overflow = "hidden";
          e.preventDefault();
        }
      });

      educationTimeline.appendChild(item);
    });
  }

  // Cerrar el modal
  if (certificateModalClose) {
    certificateModalClose.addEventListener("click", () => {
      certificateModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

  // Cerrar modal al hacer click fuera del contenido
  certificateModal.addEventListener("click", (e) => {
    if (e.target === certificateModal) {
      certificateModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Cerrar modal con ESC
  document.addEventListener("keydown", (e) => {
    if (certificateModal.style.display === "flex" && (e.key === "Escape" || e.key === "Esc")) {
      certificateModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});