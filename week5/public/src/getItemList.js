(async () => {
    let items = await requestGetItems();
    items = items.data;
    console.log('====items====')
    console.log(items);

    if(items.length > 0) {
        const mainDiv = document.getElementById('main-content');
        const loadingDiv = mainDiv.childNodes[1];
        console.log(loadingDiv);
        const replacedDiv = document.createElement('div');

        mainDiv.replaceChild(replacedDiv, loadingDiv);
        for(let i = 0; i < items.length; i++) {
            let item = items[i];
            let itemDiv = document.createElement('div');
            itemDiv.classList.add('content-item', `item-container-${i % 2}`);
            itemDiv.innerHTML = `
                <span><p>Name: ${item.name}</p></span>
                <span><p>Type: ${item.type}</p></span>
            `;
            replacedDiv.appendChild(itemDiv);
        }
    }

})();