import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '340eec4ed2e348c4942e7c6f48900b53', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
