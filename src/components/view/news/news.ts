import './news.css';
import {SingleArticle} from "../../../../types/news";

class News {
    draw(data: SingleArticle[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');
            const newsMetaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement | null;
            if(newsMetaPhoto) newsMetaPhoto.style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            const newsMetaAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement | null;
            if(newsMetaAuthor) newsMetaAuthor.textContent = item.author || item.source.name;
            const newsMetaDate = newsClone.querySelector('.news__meta-date') as HTMLElement | null;
            if(newsMetaDate) newsMetaDate.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            const newsDescriptionTitle = newsClone.querySelector('.news__description-title') as HTMLElement | null;
            if(newsDescriptionTitle) newsDescriptionTitle.textContent = item.title;

            const newsDescriptionSource = newsClone.querySelector('.news__description-source') as HTMLElement | null;
            if(newsDescriptionSource) newsDescriptionSource.textContent = item.source.name;

            const newsDescriptionContent = newsClone.querySelector('.news__description-content') as HTMLElement | null;
            if(newsDescriptionContent) newsDescriptionContent.textContent = item.description;

            const newsReadMore = newsClone.querySelector('.news__read-more a') as HTMLElement | null;
            if(newsReadMore) newsReadMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });
        const newsBlock = document.querySelector('.news') as HTMLElement | null;
        if(newsBlock) {
            newsBlock.innerHTML = '';
            newsBlock.appendChild(fragment);
        }


    }
}

export default News;
