// サーバーコンポーネント
// 'use client'ディレクティブを削除

import Script from "next/script";
import ClientContent from "../components/ClientContent";
import { parseStringPromise } from "xml2js";

// src/app/page.tsx
export const revalidate = 3600; // 秒単位（3600秒 = 1時間）

// 記事の型定義
export type Article = {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string; // サムネイル画像のURL
  creatorImage?: string; // 作者のアイコン画像
  creatorName?: string; // 作者名
};

// サンプルデータ
const sampleArticles: Article[] = [
  {
    title: "React備忘録 -ライフサイクル-",
    link: "https://note.com/oyatsu_calpas04/n/nd257c811e630",
    pubDate: "2023-04-10",
    thumbnail:
      "https://assets.st-note.com/production/uploads/images/183551330/rectangle_large_type_2_709dc3273a77312669a7e8df91cdfd1e.png?width=800",
    creatorImage:
      "https://assets.st-note.com/production/uploads/images/141253449/profile_33700660952df8114944f12254d61420.jpg?fit=bounds&format=jpeg&quality=85&width=330",
    creatorName: "Ida",
  },
];

// 安全な文字列変換
function safeString(value: any): string {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  return String(value);
}

// オブジェクトを安全に処理
function safeArticle(article: any): Article {
  return {
    title: safeString(article.title),
    link: safeString(article.link),
    pubDate: safeString(article.pubDate),
    thumbnail: safeString(article.thumbnail),
    creatorImage: article.creatorImage ? safeString(article.creatorImage) : "",
    creatorName: article.creatorName ? safeString(article.creatorName) : "",
  };
}

// RSSフィードを取得
async function fetchRssFeed(url: string): Promise<Article[]> {
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
      console.error(`RSS取得エラー: ${response.status}`);
      return sampleArticles;
    }

    const xml = await response.text();
    console.log("XML取得成功、一部:", xml.substring(0, 500));

    try {
      // XMLを解析
      const result = await parseStringPromise(xml, {
        explicitArray: false,
        normalizeTags: false,
      });

      // 記事がなければサンプルを返す
      if (!result.rss?.channel?.item) {
        console.log("記事が見つかりませんでした");
        return sampleArticles;
      }

      // アイテム配列を取得
      const items = result.rss.channel.item;
      const itemArray = Array.isArray(items) ? items : [items];

      // 最初の記事の生データをログに出力
      console.log(
        "最初の記事の生データ:",
        JSON.stringify(itemArray[0], null, 2)
      );

      // 記事配列を作成
      const articles = itemArray.map((item: any) => {
        // タイトルと日付を取得
        const title = safeString(item.title);
        const link = safeString(item.link);
        const pubDate = item.pubDate
          ? new Date(item.pubDate).toLocaleDateString("ja-JP")
          : "";

        // サムネイルの取得
        let thumbnail = "";

        // media:thumbnailの取得（属性としてURL情報がある場合）
        if (
          item["media:thumbnail"] &&
          typeof item["media:thumbnail"] === "object"
        ) {
          if (item["media:thumbnail"].$) {
            thumbnail = safeString(item["media:thumbnail"].$.url);
          }
        }

        // サムネイル取得の代替手段（文字列の場合）
        if (
          !thumbnail &&
          item["media:thumbnail"] &&
          typeof item["media:thumbnail"] === "string"
        ) {
          thumbnail = item["media:thumbnail"];
        }

        // descriptionからの取得（最後の手段）
        if (!thumbnail && item.description) {
          const match = /<img.*?src=["'](.*?)["']/.exec(item.description);
          if (match && match[1]) {
            thumbnail = match[1];
          }
        }

        // 作者情報
        const creatorName = item["note:creatorName"]
          ? safeString(item["note:creatorName"])
          : "";
        const creatorImage = item["note:creatorImage"]
          ? safeString(item["note:creatorImage"])
          : "";

        const article = {
          title,
          link,
          pubDate,
          thumbnail,
          creatorName,
          creatorImage,
        };

        return article;
      });

      if (articles.length > 0) {
        console.log(
          "最初の処理済み記事:",
          JSON.stringify(articles[0], null, 2)
        );
      }

      return articles;
    } catch (parseError) {
      console.error("XML解析エラー:", parseError);
      return sampleArticles;
    }
  } catch (error) {
    console.error("RSS取得エラー:", error);
    return sampleArticles;
  }
}

// 直接APIからRawのXMLを取得し解析する関数
async function directParseRssFeed(url: string): Promise<Article[]> {
  try {
    // 本番環境ではCORSの問題があるかもしれないので注意
    const response = await fetch(url);
    const xml = await response.text();

    // XMLをDOM解析
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");

    // 記事アイテムを全て取得
    const items = xmlDoc.querySelectorAll("item");
    const articles: Article[] = [];

    items.forEach((item) => {
      // サムネイル画像を取得
      let thumbnail = "";
      const mediaThumbnail = item.querySelector("media\\:thumbnail");
      if (mediaThumbnail) {
        thumbnail = mediaThumbnail.getAttribute("url") || "";
      }

      // 作者情報を取得
      const creatorImage =
        item.querySelector("note\\:creatorImage")?.textContent || "";
      const creatorName =
        item.querySelector("note\\:creatorName")?.textContent || "";

      articles.push({
        title: item.querySelector("title")?.textContent || "",
        link: item.querySelector("link")?.textContent || "",
        pubDate: new Date(
          item.querySelector("pubDate")?.textContent || ""
        ).toLocaleDateString("ja-JP"),
        thumbnail,
        creatorImage,
        creatorName,
      });
    });

    return articles;
  } catch (error) {
    console.error("Direct XML parsing error:", error);
    return [];
  }
}

export default async function Home() {
  try {
    // NoteのRSSフィードを取得
    const noteRssUrl = "https://note.com/oyatsu_calpas04/rss";
    const articles = await fetchRssFeed(noteRssUrl);

    // 記事が取得できなければサンプルデータを使用
    const displayArticles = articles.length > 0 ? articles : sampleArticles;

    return (
      <main>
        <ClientContent articles={displayArticles} />
      </main>
    );
  } catch (error) {
    console.error("エラー:", error);
    return (
      <main>
        <ClientContent articles={sampleArticles} />
      </main>
    );
  }
}
