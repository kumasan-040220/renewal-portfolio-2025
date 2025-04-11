"use client";

import { useEffect, useState, useRef } from "react";
import Script from "next/script";
import { Article } from "../app/page";
import Image from "next/image";

type ClientContentProps = {
  articles: Article[];
};

export default function ClientContent({ articles }: ClientContentProps) {
  // 画像ロードエラー処理用の状態
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {}
  );
  // モーダルの表示状態を管理
  const [isModalOpen, setIsModalOpen] = useState(false);
  // フォーム要素への参照
  const formRef = useRef<HTMLFormElement>(null);

  // フォーム送信処理用の関数
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // フォームのデフォルト送信処理を実行（formspree.ioへのデータ送信）
    // この段階では送信処理はキャンセルせず通常通り行われる

    // 非同期で少し遅らせてモーダルを閉じる（データ送信完了を待つため）
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.reset(); // フォームをリセット
      }
      closeModal();
      console.log("フォーム送信完了、モーダル閉じました");
    }, 1000);
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  // モーダルを開く
  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("モーダルを開きます");
    // フォームが既に入力済みの場合はリセット
    if (formRef.current) {
      formRef.current.reset();
    }
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // スクロール防止
  };

  // モーダルを閉じる
  const closeModal = () => {
    console.log("モーダルを閉じます");
    setIsModalOpen(false);
    document.body.style.overflow = ""; // スクロール再開
  };

  useEffect(() => {
    console.log("Articles in client:", articles);
  }, [articles]);

  return (
    <>
      <Script src="/cmn/js/hamburger.js" strategy="afterInteractive" />
      <Script src="/cmn/js/main-bg.js" strategy="afterInteractive" />
      <Script
        src="https://kit.fontawesome.com/ddbbf01036.js"
        strategy="afterInteractive"
      />

      <header id="header">
        <nav>
          <ul className="nav-list">
            <li>
              <a href="#note">Works</a>
            </li>
            <li>
              <a href="#profile">Profile</a>
            </li>
            <li>
              <a href="#" onClick={openModal}>
                Contact
              </a>
            </li>
          </ul>

          <div className="burger">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </nav>
      </header>

      <div className="main-container">
        <div className="background bg-image-1 active"></div>
        <div className="background bg-image-2"></div>
        <div className="background bg-image-3"></div>
        <h1>Hello World.</h1>
      </div>

      <section id="note">
        <div className="wrapper">
          <div className="note-container">
            <div className="section-title">
              <h1>Note</h1>
            </div>

            <div className="note-contents">
              {articles.map((article, index) => (
                <div key={index} className="note-item">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.thumbnail && !imageErrors[index] && (
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        onError={() => handleImageError(index)}
                        width="300"
                      />
                    )}
                  </a>

                  <h2>{article.title}</h2>
                  <p>{article.pubDate}</p>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="works">
        <div className="wrapper">
          <div className="works-container">
            <div className="section-title">
              <h1>Works</h1>
            </div>

            <div className="works-contents">
              <img src="/cmn/img/img_bg/bg_comingsoon.jpg" alt="coming soon" />
              <img src="/cmn/img/img_bg/bg_comingsoon.jpg" alt="coming soon" />
              <img src="/cmn/img/img_bg/bg_comingsoon.jpg" alt="coming soon" />
              <img src="/cmn/img/img_bg/bg_comingsoon.jpg" alt="coming soon" />
              <img src="/cmn/img/img_bg/bg_comingsoon.jpg" alt="coming soon" />
              <img src="/cmn/img/img_bg/bg_comingsoon.jpg" alt="coming soon" />
            </div>
          </div>
        </div>
      </section>

      <section id="profile">
        <div className="wrapper">
          <div className="section-title">
            <h1>Profile</h1>
          </div>

          <div className="profile-container">
            <div className="profile-content">
              <div className="basic-info">
                <div className="profile-img">
                  <Image
                    src="/cmn/img/img_ico/ico_profile.png"
                    alt="NCG_EVERGREEN"
                    width={200}
                    height={200}
                  />
                </div>

                <div className="profile-txt">
                  <div className="name-div">
                    <p className="family-name">Ida</p>
                    <p className="first-name">Takuma</p>
                  </div>

                  <div className="affiliation-div">
                    <p className="affiliation">University Student</p>
                    <p className="birthday">February.20,2004</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="skills-info">
              <div className="skill-category">
                <h3>Languages</h3>
                <div className="skills-group">
                  <span className="skill lang">Python</span>
                  <span className="skill lang">C言語</span>
                  <span className="skill lang">Java</span>
                  <span className="skill lang">HTML</span>
                  <span className="skill lang">CSS</span>
                  <span className="skill lang">JavaScript</span>
                </div>
              </div>

              <div className="skill-category">
                <h3>Development Tools</h3>
                <div className="skills-group">
                  <span className="skill dev">VSCode</span>
                  <span className="skill dev">Cursor</span>
                  <span className="skill dev">GitHub</span>
                </div>
              </div>

              <div className="skill-category">
                <h3>AI Tools</h3>
                <div className="skills-group">
                  <span className="skill ai">ChatGPT</span>
                  <span className="skill ai">Cursor</span>
                  <span className="skill ai">Suno</span>
                  <span className="skill ai">Ideogram</span>
                  <span className="skill ai">Cursor</span>
                </div>
              </div>

              <div className="skill-category">
                <h3>Design Tools</h3>
                <div className="skills-group">
                  <span className="skill design">Photoshop</span>
                  <span className="skill design">PremierePro</span>
                  <span className="skill design">Illustrator</span>
                  <span className="skill design">Figma</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-wrapper">
          <div className="button-group">
            <div className="button">
              <a href="https://x.com/ida_kuma040220?s=21" target="_blank">
                <div className="icon">
                  <i className="fa-brands fa-x-twitter"></i>
                </div>
                <span>Twitter</span>
              </a>
            </div>

            <div className="button">
              <a
                href="https://www.instagram.com/ida_nanoda?igsh=djJ1eXZ5ZDlwcW9o&utm_source=qr"
                target="_blank"
              >
                <div className="icon">
                  <i className="fa-brands fa-instagram"></i>
                </div>
                <span>Instagram</span>
              </a>
            </div>

            <div className="button">
              <a href="https://github.com/kumasan-040220" target="_blank">
                <div className="icon">
                  <i className="fa-brands fa-github"></i>
                </div>
                <span>GitHub</span>
              </a>
            </div>

            <div className="button">
              <a href="#" onClick={openModal}>
                <div className="icon">
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <span>E-mail</span>
              </a>
            </div>
          </div>
          <p className="copyright">©︎ 2024 Idakuma</p>
        </div>
      </footer>

      <div className={`contact_form ${isModalOpen ? "active" : ""}`}>
        <button className="close_button" onClick={closeModal}></button>
        <div className="title">お問い合わせ</div>
        <form
          ref={formRef}
          action="https://formspree.io/f/manepoda"
          method="post"
          onSubmit={handleSubmit}
        >
          <div className="item">
            <div className="label">お名前</div>
            <div className="inputs">
              <input type="text" name="name" required />
            </div>
          </div>
          <div className="item">
            <div className="label">メールアドレス</div>
            <div className="inputs">
              <input type="email" name="email" required />
            </div>
          </div>
          <div className="item">
            <div className="label">件名</div>
            <div className="inputs">
              <input type="text" name="subject" required />
            </div>
          </div>
          <div className="item">
            <div className="label">内容</div>
            <div className="inputs">
              <textarea name="message" required></textarea>
            </div>
          </div>
          <div className="button_area">
            <input type="submit" value="送信" />
            <input type="reset" value="リセット" />
          </div>
        </form>
      </div>
      <div
        className={`contact_overlay ${isModalOpen ? "active" : ""}`}
        onClick={closeModal}
      ></div>
    </>
  );
}
