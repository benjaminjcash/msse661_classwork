const access_token  = storageHasData() ? getStorage('access_token') : '';
const token = `Bearer ${access_token}`;

const _get = async (url) => {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json'
        }
    });
    return res.json();
}

const _post = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return res.json();
}

const _put = async (url, data) => {
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return res.json();
}

const _delete = async(url, itemId) => {
    const res = await fetch(`${url}/${itemId}`, {
        method: 'DELETE',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json'
        }
    });
    return res.json();
}