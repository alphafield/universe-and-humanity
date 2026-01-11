(() => {
  const HOME_ANCHORS = new Set(["home","overview","alpha","universe","humanity","civilization","gateway"]);
  const SERIES_ROUTE = {
    "nine-volumes": "pages/volumes.html#nine-volumes",
    "epic": "pages/volumes.html#cosmic-epic",
    "dao": "pages/volumes.html#the-dao",
    "sutra": "pages/volumes.html#heart-sutra",
    "parables": "pages/volumes.html#parables",
    "publishing": "pages/volumes.html#publishing",
    "volume1": "pages/volumes.html#volume1"
  };

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", function(e){
      const href = this.getAttribute("href");
      if (!href || href === "#") return;

      const id = href.slice(1);

      if (SERIES_ROUTE[id]) {
        e.preventDefault();
        window.location.href = SERIES_ROUTE[id];
        return;
      }

      if (HOME_ANCHORS.has(id)) {
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }, { passive: false });
  });
})();

