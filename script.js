document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const hamburger = document.querySelector(".hamburger");
    const navMobile = document.getElementById("nav-mobile");
  
    const itemsPerPage = 21;
    let currentPage = 1;
    const totalPages = Math.ceil(students.length / itemsPerPage);
  
    // Hamburger menü işlevi
    if (hamburger && navMobile) {
      hamburger.addEventListener("click", () => {
        navMobile.classList.toggle("active");
      });
    }
  
    function renderStudents() {
      productList.innerHTML = ""; // Önceki kartları temizle
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const studentsToShow = students.slice(start, end);
  
      studentsToShow.forEach(student => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${student.img}" alt="Profil">
          <div class="product-info">
            <h3>${student.name}</h3>
            <p class="price">${student.year}</p>
            <a class="ekle-btn" href="${student.link}" target="_blank">See Portfolio</a>
          </div>
        `;
        productList.appendChild(card);
      });
    }
  
    function changePage(page) {
      if (page < 1 || page > totalPages) return;
      currentPage = page;
      renderStudents();
      renderPagination();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  
    function renderPagination() {
      const pagination = document.getElementById("pagination");
      pagination.innerHTML = "";
  
      const prev = document.createElement("a");
      prev.href = "#";
      prev.textContent = "« Önceki";
      prev.onclick = (e) => {
        e.preventDefault();
        changePage(currentPage - 1);
      };
      pagination.appendChild(prev);
  
      for (let i = 1; i <= totalPages; i++) {
        const page = document.createElement("a");
        page.href = "#";
        page.textContent = i;
        if (i === currentPage) page.classList.add("active");
        page.onclick = (e) => {
          e.preventDefault();
          changePage(i);
        };
        pagination.appendChild(page);
      }
  
      const next = document.createElement("a");
      next.href = "#";
      next.textContent = "Sonraki »";
      next.onclick = (e) => {
        e.preventDefault();
        changePage(currentPage + 1);
      };
      pagination.appendChild(next);
    }
  
    // Başlangıçta öğrencileri ve sayfalamayı göster
    renderStudents();
    renderPagination();
  });
  