// Load purchased items
browser.storage.local.get("gameState").then((data) => {
  const gameState = data.gameState || {};
  const purchasedItems = gameState.purchasedItems || [];
  const itemsContainer = document.getElementById("purchased-items");
  if (purchasedItems.length === 0) {
    itemsContainer.innerHTML = "<p>You haven't bought anything yet!</p>";
  } else {
    purchasedItems.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.innerHTML = `<p>${item.name} - $${item.price.toLocaleString()}</p>`;
      itemsContainer.appendChild(itemDiv);
    });
  }
});

// Back to popup
document.getElementById("back").addEventListener("click", () => {
  window.close();
});

