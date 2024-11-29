const itemsData = {
  cars: [
    { name: "Toyota Corolla", price: 20000 },
    { name: "Honda Civic", price: 25000 },
    { name: "Toyota highlander", price: 40000 }
  ],
  houses: [
    { name: "Apartment", price: 50000 },
    { name: "Townhouse", price: 150000 },
    { name: "Villa", price: 500000 }
  
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
    const gameState = data.gameState || {}; // Fetch existing game state
    
    // Ensure the money is enough for the purchase
    if (gameState.money > price) {
      // Deduct money from the user
      gameState.money = gameState.Sate - price;
      
      // Add the purchased item to the user's collection
      gameState.purchasedItems = gameState.purchasedItems || []; // Initialize the collection if it doesn't exist
      gameState.purchasedItems.push({ name, price }); // Add the purchased item to the collection

      // Update the game state and save it
      browser.storage.local.set({ gameState });

      // Show a success message
      alert(`You bought ${name}!`);
    } else {
      // Show an alert if the user doesn't have enough money
      alert("You don't have enough money!");
    }
  });
}


 //// Buy item logic
 //function buyItem(name, price) {
 //  browser.storage.local.get("gameState").then((data) => {
 //    const gameState = data.gameState || {};
 //    if (gameState.money >= price) {
 //      gameState.money -= price;
 //      gameState.purchasedItems = gameState.purchasedItems || [];
 //      gameState.purchasedItems.push({ name, price });
 //      browser.storage.local.set({ gameState });
 //      alert(`You bought ${name}!`);
 //    } else {
 //      alert("Not enough money!");
 //    }
 //  });
 //}


 // Back to popup
 document.getElementById("back").addEventListener("click", () => {
  window.close();
});

