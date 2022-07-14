import News from './news/news';
import Sources from './sources/sources';

import { ArticlesInterface, SourcesInterface } from "../../../types/news";

export class AppView {
    private _news: News;
    private _sources: Sources;
    constructor() {
        this._news = new News();
        this._sources = new Sources();
    }

    drawNews(data?: ArticlesInterface) {
        const values = data?.articles ? data?.articles : [];
        this._news.draw(values);
    }

    drawSources(data?: SourcesInterface) {
        const values = data?.sources ? data?.sources : [];
        this._sources.draw(values);
    }
}