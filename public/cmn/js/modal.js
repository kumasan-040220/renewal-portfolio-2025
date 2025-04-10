document.addEventListener("DOMContentLoaded", function () {
  console.log("Modal script loaded");

  const contactTrigger = document.querySelector(".contact-trigger");
  const contactForm = document.querySelector(".contact_form");
  const contactOverlay = document.querySelector(".contact_overlay");
  const closeButton = document.querySelector(".close_button");

  console.log("Elements found:", {
    contactTrigger: !!contactTrigger,
    contactForm: !!contactForm,
    contactOverlay: !!contactOverlay,
    closeButton: !!closeButton,
  });

  if (contactTrigger && contactForm && contactOverlay && closeButton) {
    console.log("All elements found, setting up event listeners");

    // モーダルを開く
    contactTrigger.addEventListener("click", function (e) {
      console.log("Contact trigger clicked");
      e.preventDefault();
      contactForm.classList.add("active");
      contactOverlay.classList.add("active");
      document.body.style.overflow = "hidden"; // スクロール防止
    });

    // モーダルを閉じる
    closeButton.addEventListener("click", function () {
      console.log("Close button clicked");
      contactForm.classList.remove("active");
      contactOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });

    // オーバーレイクリックで閉じる
    contactOverlay.addEventListener("click", function () {
      console.log("Overlay clicked");
      contactForm.classList.remove("active");
      contactOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  } else {
    console.error("Some elements are missing for the modal functionality");
  }
});
