const ITEM_API = `${BASE_URL}/item`;

const requestGetItems = () => _get(ITEM_API);

const requestDeleteItem = (itemId) => _delete(ITEM_API, itemId);