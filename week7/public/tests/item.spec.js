describe("Item API Service", () => {
    const testItemAPIService = new ItemAPIService();
    const testItemService = new ItemService(testItemAPIService);

    it("should initialize item list", () => {
        spyOn(testItemService, 'init');
        testItemService.init();
        expect(testItemService.init).toHaveBeenCalled();
    });

    it("should add an item", async () => {
        await testItemService.getItems();
        const currentItems = testItemService.items;
        const newItem = {
            name: "Cheeseburger",
            type: "Food"
        }
        
        await testItemAPIService.addItem(newItem);
        await testItemService.getItems();
        const nextItems = testItemService.items;
        expect(nextItems.length).toBe(currentItems.length + 1);
    });

    it("should get all items", async () => {
        spyOn(testItemService, 'getItems');
        await testItemService.getItems();
        expect(testItemService.getItems).toHaveBeenCalled();
        expect(Array.isArray(testItemService.items)).toBe(true);
    });

    it("should update an item", async () => {
        // Make sure update test item exists in database. If not, create it.
        await testItemService.getItems();
        let currentItems = testItemService.items;
        let updateItemExists = false;
        let testItem = {};
        const re = /UpdateTestItem/;
        currentItems.forEach(item => {
            if(re.exec(item.name)) {
                updateItemExists = true;
                testItem = item;
            }
        });
        if(!updateItemExists) {
            const newItem = {
                name: "UpdateTestItem0",
                type: "test"
            }
            await testItemAPIService.addItem(newItem);
            await testItemService.getItems();
            let itemsAfterInsert = testItemService.items;
            itemsAfterInsert.forEach(item => {
                if(re.exec(item.name)) {
                    testItem = item;
                }
            });
        }

        // Increment the number in name of the test item and update
        const currentCount = testItem.name.match(/\d+/)[0];
        const sanitizedName = testItem.name.substring(0, 14);
        const itemToUpdate = {
            _id: testItem._id,
            name: sanitizedName + (parseInt(currentCount) + 1)
        }
        await testItemAPIService.updateItem(itemToUpdate);
        await testItemService.getItems();
        let itemsAfterUpdate = testItemService.items;
        let testItemAfterUpdate = {};
        itemsAfterUpdate.forEach(item => {
            if(re.exec(item.name)) {
                testItemAfterUpdate = item;
            }
        });
        
        // Compare the updated item name to old one to validate it updated
        const newCount = testItemAfterUpdate.name.match(/\d+/)[0];
        expect(parseInt(newCount)).toBe(parseInt(currentCount) + 1);
    });

    it("should delete an item", async () => {
        // Insert test item into database, and verify it was created successfully
        let testItem = {
            name: "DeleteTestItem",
            type: "test"
        };
        await testItemAPIService.addItem(testItem);
        await testItemService.getItems();
        let currentItems = testItemService.items;
        let testItemFound = false;
        let testItemFromDb = {}
        currentItems.forEach(item => {
            if(item.name === "DeleteTestItem") {
                testItemFound = true;
                testItemFromDb = item;
            }
        });

        // Delete test item from database
        await testItemAPIService.deleteItem(testItemFromDb._id);
        await testItemService.getItems();
        let itemsAfterDelete = testItemService.items;
        let testItemFoundAfterDelete = false;
        itemsAfterDelete.forEach(item => {
            if(item._id === testItemFromDb._id) {
                testItemFoundAfterDelete = true
            }
        });

        // Verify the test item does not exist in the database
        expect(testItemFound).toBe(!testItemFoundAfterDelete);
    })

})