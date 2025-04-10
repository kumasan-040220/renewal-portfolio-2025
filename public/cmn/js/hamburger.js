// ハンバーガーメニュー用のスクリプト
(() => {
  // DOMContentLoadedだとReactのマウント後に実行されない場合があるので
  // 遅延実行も追加
  const initHamburger = () => {
    console.log("hamburger init");
    const burger = document.querySelector(".burger");
    const navList = document.querySelector(".nav-list");

    if (burger && navList) {
      console.log("burger and navList found");

      // クリックイベントを再設定する前に古いイベントを削除
      burger.removeEventListener("click", burgerClickHandler);

      // ハンバーガーメニュークリック時の処理を関数化
      burger.addEventListener("click", burgerClickHandler);

      // ナビゲーションリンクをクリックしたらメニューを閉じる
      const navLinks = navList.querySelectorAll("a");
      navLinks.forEach((link) => {
        link.removeEventListener("click", navLinkClickHandler);
        link.addEventListener("click", navLinkClickHandler);
      });
    } else {
      console.log("burger or navList not found");
      // 要素が見つからない場合は、少し待ってから再試行
      setTimeout(initHamburger, 500);
    }
  };

  // ハンバーガーメニュークリックハンドラー
  const burgerClickHandler = () => {
    const burger = document.querySelector(".burger");
    const navList = document.querySelector(".nav-list");

    if (burger && navList) {
      navList.classList.toggle("nav-active");
      burger.classList.toggle("toggle");
      console.log("burger clicked, nav toggled");
    }
  };

  // ナビリンククリックハンドラー
  const navLinkClickHandler = () => {
    const burger = document.querySelector(".burger");
    const navList = document.querySelector(".nav-list");

    if (burger && navList) {
      navList.classList.remove("nav-active");
      burger.classList.remove("toggle");
      console.log("nav link clicked, menu closed");
    }
  };

  // DOMContentLoadedで初期化
  document.addEventListener("DOMContentLoaded", initHamburger);

  // バックアップとして、少し遅延して実行
  setTimeout(initHamburger, 1000);
})();
