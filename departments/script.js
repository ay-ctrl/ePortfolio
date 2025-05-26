document.addEventListener("DOMContentLoaded", () => {
  const studentList = document.getElementById("student-list");
  const hamburger = document.querySelector(".hamburger");
  const navMobile = document.getElementById("nav-mobile");
  const pagination = document.getElementById("pagination");
  const title = document.getElementById("section-title");

  // Hamburger Menu Open-Close
  if (hamburger && navMobile) {
    hamburger.addEventListener("click", () => {
      navMobile.classList.toggle("active");
    });
  }

  // Get department iformation from URL
  const params = new URLSearchParams(window.location.search);
  const section = params.get("department");
  const faculty = params.get("faculty");

  // Load students' ePortfolio information dynamically
  if (section) {
    const script = document.createElement("script");
    script.src = `./database/${faculty}/${section}DB.js`; 
    script.onload = () => {
      if (typeof students !== "undefined" && Array.isArray(students) && students.length > 0) {
        initPagination(students);
      } else {
        studentList.innerHTML = "<p>Currently, there is not any portfolio for this department.</p>";
      }
      if (typeof departmentName !== "undefined") {
        title.innerText = departmentName;
      }
    };

    script.onerror = () => {
      studentList.innerHTML = "<p>Currently, there is not any portfolio for this department.</p>";
      if (typeof departmentName !== "undefined") {
        title.innerText = departmentName;
      }
    };
    document.head.appendChild(script);
  }

  // Pagination start
  function initPagination(data) {
    const itemsPerPage = 10;
    let currentPage = 1;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    function renderPage(page) {
      if (page < 1 || page > totalPages) return;
      currentPage = page;
      studentList.innerHTML = "";

      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const currentStudents = data.slice(start, end);

      currentStudents.forEach((student) => {
        const card = document.createElement("div");
        card.className = "student-card";
        card.innerHTML = `
          <img src="${student.img}" alt="${student.name}">
          <h4>${student.name}</h4>
          <a href="${student.link}" target="_blank" class="btn">View Portfolio</a>
        `;
        studentList.appendChild(card);
      });

      renderPagination();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function renderPagination() {
      pagination.innerHTML = "";

      const prev = document.createElement("a");
      prev.href = "#";
      prev.textContent = "« Prev";
      prev.onclick = (e) => {
        e.preventDefault();
        renderPage(currentPage - 1);
      };
      pagination.appendChild(prev);

      for (let i = 1; i <= totalPages; i++) {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = i;
        if (i === currentPage) link.classList.add("active");
        link.onclick = (e) => {
          e.preventDefault();
          renderPage(i);
        };
        pagination.appendChild(link);
      }

      const next = document.createElement("a");
      next.href = "#";
      next.textContent = "Next »";
      next.onclick = (e) => {
        e.preventDefault();
        renderPage(currentPage + 1);
      };
      pagination.appendChild(next);
    }

    renderPage(currentPage);
  }
});
