const API_KEY = 'c382af1a4f89492198f79b8e10125e23';

class CacheProxy {
    _fetchData( url ){
        /*
         * @TODO - Uzupełnij tą metodę tak, aby zwracała Promise,
         * które spełnia się do rozkodowanego z JSON
         * obiektu. Wykorzystaj fetch() do pobrania zawartości z argumentu url.
         */
         return fetch(url, {
          //  headers: {
          //    "X-Auth-Token": API_KEY
          //  }
         }).then(resp=> resp.json())
    }


    constructor(){
        this.cache = {}

        this.get = url => {
            if (url in this.cache)
                return Promise.resolve(this.cache[url]);
            else
                return this._fetchData( url ).then( data => {
                    this.cache[url] = data; return data;
                } );
        }
    }
}

module.exports = new CacheProxy();
