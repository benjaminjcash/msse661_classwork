/** Item */

const addItem = (e) => {
    e.preventDefault();
    const name = document.getElementById('name-input-add').value;
    const type = document.getElementById('type-input-add').value;
    requestAddItem({
        name: name,
        type: type
    }).then((data) => {
        if(data._id) {
            alert("item added successfully");
            window.location.href = '/item/item.html';
        } else {
            alert(data._message);
        }
    })
    .catch((error) => {
        console.log(error);
    })
}

const modifyItem = async (itemId) => {
    const items = await requestGetItems();
    if(!items?.data?.length > 0) {
        alert("could not fetch item");
        return;
    }
    let itemToModify;
    items.data.forEach(itemFromDb => {
        if(itemFromDb._id == itemId) itemToModify = itemFromDb;
    });
    console.log(itemToModify);
    document.getElementById("name-input-update").value = itemToModify.name;
    document.getElementById("type-input-update").value = itemToModify.type;
    const updateButton = document.getElementById("submit-update-button");
    updateButton.setAttribute('data-id', itemToModify._id);
    document.getElementById("update-item").classList.remove("update-item-hidden");
}

const cancelModifyItem = () => {
    document.getElementById("name-input-update").value = '';
    document.getElementById("type-input-update").value = '';
    const updateButton = document.getElementById("submit-update-button");
    updateButton.setAttribute('data-id', '');
    document.getElementById("update-item").classList.add("update-item-hidden");
}

const updateItem = (itemId) => {
    console.log(itemId);
    const newName = document.getElementById("name-input-update").value;
    const newType = document.getElementById("type-input-update").value;
    const newItem = {
        _id: itemId,
        name: newName,
        type: newType
    }
    requestUpdateItem(newItem).then((data) => {
        alert('updated item successfully');
        document.getElementById("update-item").classList.add("update-item-hidden");
        window.location.href = '/item/item.html';
    }).catch((err) => {
        alert(err);
    })
}

const deleteItem = (itemId) => {
    requestDeleteItem(itemId).then((data) => {
        alert('deleted item successfully');
        window.location.href = '/item/item.html';
    }).catch((err) => {
        alert(err);
    })
}