// すぐに実行するように変更
(() => {
  const backgrounds = document.querySelectorAll(".background");
  const h1 = document.querySelector("h1");
  let currentBg = 0;

  // SPかどうかを判定する関数
  const isSP = () => {
    return window.innerWidth <= 768;
  };

  if (h1) {
    h1.addEventListener("click", () => {
      // SPの場合は処理を実行しない
      if (isSP()) return;

      // 現在の背景のactiveクラスを削除
      backgrounds[currentBg].classList.remove("active");

      // 次の背景番号を設定（0-2の範囲で循環）
      currentBg = (currentBg + 1) % 3;

      // 新しい背景にactiveクラスを追加
      backgrounds[currentBg].classList.add("active");
    });
  }

  // 画面サイズが変更されたときの処理
  window.addEventListener("resize", () => {
    // SPになった場合、最初の背景画像のみを表示
    if (isSP()) {
      backgrounds.forEach((bg, index) => {
        if (index === 0) {
          bg.classList.add("active");
        } else {
          bg.classList.remove("active");
        }
      });
      currentBg = 0;
    }
  });
})();
