const ITEM_API = `${BASE_URL}/item`;
class ItemAPIService {
    /**
     * Gets all items from the database.
     */
    getItems = () => _get(ITEM_API);

    /**
     * Adds an item to the database.
     * @param {Object} item { name, type }
     */
    addItem = (item) => _post(ITEM_API, item);

    /**
     * Updates an item in the database.
     * @param {Object} item { _id, name, type }
     */
    updateItem = (item) => _put(`${ITEM_API}/${item._id}`, item);

    /**
     * Deletes an item from the database.
     * @param {String} itemId 
     */
    deleteItem = (itemId) => _delete(ITEM_API, itemId);
}

const itemAPIService = new ItemAPIService();