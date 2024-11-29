const itemsData = {
  cars: [
    { name: "Toyota Corolla", price: 20000 },
    { name: "Honda Civic", price: 25000 },
    { name: "Tesla Model 3", price: 40000 }
  ],
  houses: [
    { name: "Small Apartment", price: 50000 },
    { name: "Family Home", price: 150000 },
    { name: "Luxury Villa", price: 500000 }
  ]
};

// Load category items
document.querySelectorAll("button[data-category]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    loadItems(category);
  });
});

// Load items dynamically
function loadItems(category) {
  const itemsContainer = document.getElementById("items");
  itemsContainer.innerHTML = ""; // Clear existing items
  itemsData[category].forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
      <p>${item.name} - $${item.price.toLocaleString()}</p>
      <button class="buy-button" data-name="${item.name}" data-price="${item.price}">Buy</button>
    `;
    itemsContainer.appendChild(itemDiv);
  });

  // Add event listeners to Buy buttons
  document.querySelectorAll(".buy-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemName = btn.dataset.name;
      const itemPrice = parseFloat(btn.dataset.price);
      buyItem(itemName, itemPrice);
    });
  });
}

// Buy item logic
function buyItem(name, price) {
  browser.storage.local.get("gameState").then((data) => {
    const gameState = data.gameState || {};
    if (gameState.money >= price) {
      gameState.money -= price;
      gameState.purchasedItems = gameState.purchasedItems || [];
      gameState.purchasedItems.push({ name, price });
      browser.storage.local.set({ gameState });
      alert(`You bought ${name}!`);
    } else {
      alert("Not enough money!");
    }
  });
}

// Back to popup
document.getElementById("back").addEventListener("click", () => {
  window.close();
});

