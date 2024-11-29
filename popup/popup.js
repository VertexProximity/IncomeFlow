// Default game state
const defaultState = {
    money: 0,
    income: 1999,
    nextIncome: 2,
    upgradeCost: 10
  };
  
  // Load saved state or use default
  let gameState = { ...defaultState };
  browser.storage.local.get("gameState").then((data) => {
    if (data.gameState) {
      gameState = data.gameState;
      updateUI();
    }
  });
  
// Update UI elements
function updateUI() {
    document.getElementById("money").textContent = gameState.money.toFixed(2);
    document.getElementById("income").textContent = gameState.income;
    document.getElementById("next-income").textContent = gameState.nextIncome;
  
    const upgradeButton = document.getElementById("upgrade-income");
    upgradeButton.textContent = `Increase Income ($${gameState.upgradeCost.toFixed(2)})`;
    upgradeButton.disabled = gameState.money < gameState.upgradeCost;
  }
  
  // Earn money when button is clicked
  document.getElementById("earn-button").addEventListener("click", () => {
    gameState.money += gameState.income;
    updateUI();
    saveState();
  });
  
  // Upgrade income
  document.getElementById("upgrade-income").addEventListener("click", () => {
    if (gameState.money >= gameState.upgradeCost) {
      gameState.money -= gameState.upgradeCost;
      gameState.income = gameState.nextIncome;
      gameState.nextIncome += 1;
      gameState.upgradeCost *= 1.5; // Increase cost for the next upgrade
      updateUI();
      saveState();
    }
  });
  

      //  
      //  // Update UI elements
      //  function updateUI() {
      //    document.getElementById("money").textContent = gameState.money.toFixed(2);
      //    document.getElementById("income").textContent = gameState.income;
      //    document.getElementById("next-income").textContent = gameState.nextIncome;
      //    document.getElementById("upgrade-income").disabled =
      //      gameState.money < gameState.upgradeCost;
      //  }
      //  
      //  // Save game state to storage
      //  function saveState() {
      //    browser.storage.local.set({ gameState });
      //  }
      //  
      //  // Earn money when button is clicked
      //  document.getElementById("earn-button").addEventListener("click", () => {
      //    gameState.money += gameState.income;
      //    updateUI();
      //    saveState();
      //  });
      //  
      //  // Upgrade income
      //  document.getElementById("upgrade-income").addEventListener("click", () => {
      //    if (gameState.money >= gameState.upgradeCost) {
      //      gameState.money -= gameState.upgradeCost;
      //      gameState.income = gameState.nextIncome;
      //      gameState.nextIncome += 1;
      //      gameState.upgradeCost *= 1.5; // Increase cost for the next upgrade
      //      updateUI();
      //      saveState();
      //    }
      //  });
      //  
// Open marketplace
document.getElementById("marketplace-button").addEventListener("click", () => {
  browser.tabs.create({ url: browser.runtime.getURL("marketplace/marketplace.html") });
});

// Open showcase
document.getElementById("showcase-button").addEventListener("click", () => {
  browser.tabs.create({ url: browser.runtime.getURL("showcase/showcase.html") });
});

