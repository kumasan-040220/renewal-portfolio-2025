// src/lib/getNoteArticles.ts
import Parser from 'rss-parser';

export type NoteArticle = {
  title: string;
  link: string;
  pubDate: string;
};

export async function getNoteArticles(): Promise<NoteArticle[]> {
  const parser = new Parser();
  const feed = await parser.parseURL('https://note.com/oyatsu_calpas04/rss');

  return feed.items.slice(0, 5).map(item => ({
    title: item.title ?? '無題',
    link: item.link ?? '#',
    pubDate: item.pubDate ?? '',
  }));
}
