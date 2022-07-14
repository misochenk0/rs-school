import News from './news/news';
import Sources from './sources/sources';

import { ArticlesInterface, SourcesInterface } from "../../../types/news";

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data?: ArticlesInterface) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data?: SourcesInterface) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}