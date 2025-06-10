const historyDisplay = document.getElementById("history");
const resultDisplay = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");

let current = "";      // Tämä tallentaa koko laskutoimituksen merkkijonona
let result = "";       // Tämä tallentaa viimeisimmän tuloksen
let resetNext = false; // Käytetään, kun halutaan aloittaa uusi lasku edellisen tuloksen jälkeen

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;

    // Tyhjennä kaikki
    if (action === "clear") {
      current = "";
      result = "";
      resetNext = false;
      historyDisplay.textContent = "";
      resultDisplay.textContent = "0";
      return;
    }

    // Poista viimeinen merkki
    if (action === "back") {
      current = current.slice(0, -1);
      resultDisplay.textContent = current || "0";
      return;
    }

    // Laske
    if (action === "=") {
      try {
        result = eval(current).toString();
        historyDisplay.textContent = current;
        resultDisplay.textContent = result;
        current = result;
        resetNext = true;
      } catch {
        resultDisplay.textContent = "Error";
        current = "";
      }
      return;
    }

    // Estä tuplapisteet yhteen numeroon
    if (action === ".") {
      const lastNumber = current.split(/[\+\-\*\/]/).pop(); // pilkotaan viimeinen luku
      if (lastNumber.includes(".")) {
        return;
      }
    }

    // Aloita uusi lasku jos painettiin numeroa tai pistettä edellisen tuloksen jälkeen
    if (resetNext && !isNaN(action)) {
      current = action;
      resetNext = false;
    } else {
      current += action;
    }

    resultDisplay.textContent = current;
  });
});
