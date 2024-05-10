// ----- VARIABLES -----
const HomeScreen = document.getElementById("HomeScreen"); // Startbildschirm
const input = document.getElementById("ToDoInput"); // Eingabefeld
const ToDoItems = document.getElementById("ToDoItems"); // Listenbereich
let items = JSON.parse(localStorage.getItem("ToDoItems")) || []; // Array für To-Do-Elemente -> Entweder aus Local Storage laden oder leeren Array erstellen

// ----- HIDE HOME SECTION -----
function hideHomeScreen() {
  HomeScreen.style.display = "none";
}

// ----- DISPLAY HOME SECTION -----
function displayHomeScreen() {
  HomeScreen.style.display = "flex";
}

// ----- SUBMIT ON ENTER -----
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Neuladen des Inputfeldes verhindern
    document.getElementById("Submit").click(); // Button mit Klick auslösen
    input.value = ""; // Inputfeld leeren
  }
});

// ----- DISPLAY ARRAY AS CHECKBOXES -----
function displayToDoList() {
  ToDoItems.innerHTML = ""; // Inhalt leeren -> Alte Einträge aus vorher angezeigten Versionen werden entfernt und Liste wird neu erstellt. 

  items.forEach((item, index) => {
    // Wrapper für Todo-Elemente
    const ItemWrapper = document.createElement("div");
    ItemWrapper.classList.add("todo-item");

    // Label/Container
    const label = document.createElement("label");
    label.classList.add("container");
    label.textContent = item.text;

    // Inputbereich/Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.checked; // Status der Checkbox setzen
    checkbox.addEventListener(
      "change",
      () => {
      items[index].checked = checkbox.checked; // Checkbox-Zustand im Array aktualisieren
      saveToLocalStorage(); // Checkbox-Zustand im LocalStorage aktualisieren
    });
    label.appendChild(checkbox);

    // Eigenes Checkmark-Element
    const checkmark = document.createElement("span");
    checkmark.classList.add("checkmark");
    label.appendChild(checkmark);

    // Entfernen Button
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "x";
    removeButton.addEventListener("click", () => remove(index)); // Element entfernen

    // Label/Container + Button dem Wrapper zuweisen & Wrapper der Todo-Liste zuweisen (als Kindelemente)
    ItemWrapper.appendChild(label);
    ItemWrapper.appendChild(removeButton);
    ToDoItems.appendChild(ItemWrapper);
  });

  // Home Screen anzeigen oder ausblenden
  if (items.length === 0) {
    displayHomeScreen();
  } else {
    hideHomeScreen();
  }
}

// ---------- ADD ITEM ----------
function add() {
  if (input.value === "") {
    alert("Feld ist leer. Bitte Name zum Hinzufügen eingeben!");
    return;
  }
  items.push({ text: input.value, checked: false }); // Element zum Array hinzufügen
  saveToLocalStorage(); // Todo-Liste im LocalStorage speichern
  displayToDoList(); // aktualisierte Liste anzeigen
}

// ---------- REMOVE ITEM ----------
function remove(index) {
  items.splice(index, 1); // Element aus dem Array entfernen
  saveToLocalStorage(); // Todo-Liste im LocalStorage speichern
  displayToDoList(); // aktualisierte Liste anzeigen
}

// ---------- SAVE TO LOCAL STORAGE ----------
function saveToLocalStorage() {
  localStorage.setItem("ToDoItems", JSON.stringify(items));
}

// ---------- DISPLAY TODOLIST ----------
displayToDoList(); // Liste beim Laden der Seite anzeigen