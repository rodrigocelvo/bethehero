const isDark = JSON.parse(localStorage.getItem("darkMode"));
isDark ? document.documentElement.classList.add('dark-mode') : document.documentElement.classList.remove('dark-mode');
