import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import {ArticlesInterface, SourcesInterface} from "../../../types/news";

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        document.querySelector('.sources')?.addEventListener('click', (e: Event) =>
            this.controller.getNews(e, (data?: ArticlesInterface) => this.view.drawNews(data))
        );
        this.controller.getSources((data?: SourcesInterface) => this.view.drawSources(data));
    }
}

export default App;
