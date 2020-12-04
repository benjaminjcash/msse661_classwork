/**
 * @class ItemService
 * Service for the item component
 */
class ItemService {
    items = [];
    itemApiService;

    constructor(itemApiService) {
        this.itemApiService = itemApiService;
    }

    init() {
        this.render();
    }

    getItems = async () => {
        try {
            const data = await itemAPIService.getItems();
            const itemsFromDb = data.data;
            if(itemsFromDb?.length > 0) {
                this.items = itemsFromDb;
            }
        }
        catch(err) {
            console.error(err);
        }
    }
    
    /**
     * Adds an item to the database
     * @param {Object} event 
     */
    _addItem = async (e) => {
        e.preventDefault();
        const name = document.getElementById('name-input-add').value;
        const type = document.getElementById('type-input-add').value;

        try {
            const data = await itemAPIService.addItem({ name, type });
            if(data._id) {
                alert("item added successfully");
                window.location.href = '/item/item.html';
            } else {
                alert(data._message);
            }
        }
        catch(err) {
            console.error(err);
        }
    }

    /**
     * Displays the update item form and populates with item values
     * @param {String} itemId item's id from the database
     */
    _modifyItem = async (itemId) => {
        try {
            const items = await itemAPIService.getItems();
            if(!items?.data?.length > 0) {
                alert("could not fetch item");
                return;
            }
            let itemToModify;
            items.data.forEach(itemFromDb => {
                if(itemFromDb._id == itemId) itemToModify = itemFromDb;
            });
            document.getElementById("name-input-update").value = itemToModify.name;
            document.getElementById("type-input-update").value = itemToModify.type;
            const updateButton = document.getElementById("submit-update-button");
            updateButton.setAttribute('data-id', itemToModify._id);
            document.getElementById("update-item").classList.remove("update-item-hidden");
        }
        catch(err) {
            console.error(err);
        }
    }

    /**
     * Hides the update item form
     */
    _cancelModifyItem = () => {
        document.getElementById("name-input-update").value = '';
        document.getElementById("type-input-update").value = '';
        const updateButton = document.getElementById("submit-update-button");
        updateButton.setAttribute('data-id', '');
        document.getElementById("update-item").classList.add("update-item-hidden");
    }

    /**
     * Updates an item in the database
     * @param {String} itemId item's id from the database
     */
    _updateItem = async (itemId) => {
        const newName = document.getElementById("name-input-update").value;
        const newType = document.getElementById("type-input-update").value;
        const newItem = {
            _id: itemId,
            name: newName,
            type: newType
        }
        try {
            await itemAPIService.updateItem(newItem);
            alert('updated item successfully');
            document.getElementById("update-item").classList.add("update-item-hidden");
            window.location.href = '/item/item.html';
        }
        catch(err) {
            alert(err);
        }
    }

    /**
     * Deletes an item from the database
     * @param {String} itemId item's id from the database
     */
    _deleteItem = async (itemId) => {
        try {
            await itemAPIService.deleteItem(itemId);
            alert('deleted item successfully');
            window.location.href = '/item/item.html';
        }
        catch(err) {
            console.error(err);
        }
    }

    /**
     * Renders a message if no items exist
     */
    renderNoItemsMessage = () => {
        const itemList = document.getElementById('item-list');
        const message = document.createElement('h4');
        message.innerHTML = "<--- add some items to the database";
        itemList.appendChild(message);
    }

    /**
     * Renders a list of all the items in the database
     */
    render = async () => {
        try {
            await this.getItems();
            const spinner = document.getElementById('spinner');
            spinner.classList.add("spinner-hidden");
            const fragment = document.createDocumentFragment();
            if (this.items?.length > 0) {
                const itemList = document.getElementById('item-list');
                this.items.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('list-group-item');
                    listItem.innerHTML = `
                    <div class="row">
                        <div class="col-3 name-badge">
                            <span class="badge badge-primary">${item.name}</span>
                        </div>
                        <div class="col-3 type-badge">
                            <span class="badge badge-secondary">${item.type}</span>
                        </div>
                        <div class="col-4"></div>
                        <div class="col-1">
                            <button class="btn btn-secondary modify-button" onClick="itemService._modifyItem('${item._id}')">Modify</button>
                        </div>
                        <div class="col-1">
                            <button type="submit" class="btn btn-danger delete-button" onClick="itemService._deleteItem('${item._id}')">Delete</button>
                        </div>
                    </div>
                    `;
                    fragment.appendChild(listItem);
                });
                itemList.appendChild(fragment);
            } else {
                this.renderNoItemsMessage();
            }
        }
        catch (err) {
            alert(err);
        }
    }
}

const itemService = new ItemService(itemAPIService);