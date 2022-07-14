type resType = {
    ok: string,
    status: number,
    statusText: string,
    message: string,
}

type baseLinkType = string
type optionsType = {
    [apiKey: string]: string
}

class Loader {
    baseLink: string;
    options: optionsType
    constructor(baseLink: baseLinkType, options: optionsType) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: {endpoint: string, options?: object},
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: object, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data: Pick<resType, "ok" | "status" | "statusText" >) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: resType) => callback(data))
            .catch((err: string) => console.error(err));
    }
}

export default Loader;
