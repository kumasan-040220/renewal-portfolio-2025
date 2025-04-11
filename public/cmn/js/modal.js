document.addEventListener("DOMContentLoaded", function () {
  const contactTrigger = document.querySelector(".contact-trigger");
  const contactForm = document.querySelector(".contact_form");
  const contactOverlay = document.querySelector(".contact_overlay");
  const closeButton = document.querySelector(".close_button");

  if (contactTrigger && contactForm && contactOverlay && closeButton) {
    // モーダルを開く
    contactTrigger.addEventListener("click", function (e) {
      e.preventDefault();
      contactForm.classList.add("active");
      contactOverlay.classList.add("active");
      document.body.style.overflow = "hidden"; // スクロール防止
    });

    // モーダルを閉じる
    closeButton.addEventListener("click", function () {
      contactForm.classList.remove("active");
      contactOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });

    // オーバーレイクリックで閉じる
    contactOverlay.addEventListener("click", function () {
      contactForm.classList.remove("active");
      contactOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  }
});
