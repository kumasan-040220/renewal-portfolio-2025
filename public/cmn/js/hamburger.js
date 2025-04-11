// 即時実行関数に変更
(() => {
  const burger = document.querySelector(".burger");
  const navList = document.querySelector(".nav-list");

  if (burger && navList) {
    burger.addEventListener("click", () => {
      navList.classList.toggle("nav-active");
      burger.classList.toggle("toggle");
    });
  }
})();
