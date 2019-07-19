async function parseJSON(response) {
    const text = await response.text();
    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}

function checkAndParse(res) {
    const ctype = res.headers.get('Content-Type');
    const isJson = ctype && ctype.indexOf('application/json') > -1;
    if (res.status > 210) {
        return parseJSON(res).then(err => {
            if (typeof err === 'string') {
                return Promise.reject({ message: err });
            } else {
                err.statusCode = res.status;
                return Promise.reject(err);
            }
        });
    }
    return isJson ? parseJSON(res) : res;
}

export default async function fetch_(url, options = {}) {
    return fetch(url, options).then(checkAndParse);
}
