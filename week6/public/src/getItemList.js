(async () => {
    let items = await requestGetItems();
    items = items.data;
    if(items?.length > 0) {
        const spinner = document.getElementById('spinner');
        spinner.classList.add("spinner-hidden");
        const itemList = document.getElementById('item-list');
        items.forEach(item => {
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
                    <button class="btn btn-secondary modify-button" onClick="modifyItem('${item._id}')">Modify</button>
                </div>
                <div class="col-1">
                    <button type="submit" class="btn btn-danger delete-button" onClick="deleteItem('${item._id}')">Delete</button>
                </div>
            </div>
            `;
            itemList.appendChild(listItem);
        });
    }

})();