import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import {ArticlesInterface, SourcesInterface} from "../../../types/news";

class App {
    private _controller: AppController;
    private _view: AppView;
    constructor() {
        this._controller = new AppController();
        this._view = new AppView();
    }

    start() {
        document.querySelector('.sources')?.addEventListener('click', (e: Event) =>
            this._controller.getNews<Readonly<ArticlesInterface>>(e, (data) => this._view.drawNews(data))
        );
        this._controller.getSources<Readonly<SourcesInterface>>((data) => this._view.drawSources(data));
    }
}

export default App;
