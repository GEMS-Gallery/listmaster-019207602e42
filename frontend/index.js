import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItemButton');
    const shoppingList = document.getElementById('shoppingList');
    const themeToggle = document.getElementById('themeToggle');

    const renderItems = async () => {
        const items = await backend.getItems();
        shoppingList.innerHTML = '';
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = item.completed ? 'completed' : '';
            listItem.innerHTML = `
                <span>${item.name}</span>
                <button class="toggle"><i class="fas fa-check"></i></button>
                <button class="delete"><i class="fas fa-trash"></i></button>
            `;
            listItem.querySelector('.toggle').addEventListener('click', async () => {
                await backend.toggleItem(item.id);
                renderItems();
            });
            listItem.querySelector('.delete').addEventListener('click', async () => {
                await backend.deleteItem(item.id);
                renderItems();
            });
            shoppingList.appendChild(listItem);
        });
    };

    addItemButton.addEventListener('click', async () => {
        const itemName = itemInput.value.trim();
        if (itemName) {
            await backend.addItem(itemName);
            itemInput.value = '';
            renderItems();
        }
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });

    renderItems();
});
