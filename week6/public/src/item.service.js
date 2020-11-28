const ITEM_API = `${BASE_URL}/item`;

const requestGetItems = () => _get(ITEM_API);

const requestAddItem = (data) => _post(ITEM_API, data);

const requestDeleteItem = (itemId) => _delete(ITEM_API, itemId);