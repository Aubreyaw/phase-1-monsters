document.addEventListener("DOMContentLoaded", function () {
    const monsterUrl = "http://localhost:3000/monsters";
    const createMonsterDiv = document.getElementById("create-monster");
    const monsterContainer = document.getElementById("monster-container");
  
    const monstersPerPage = 50;
    let monstersArray = []; 
    let currentPage = 1;
  
    function fetchMonstersArray() {
      console.log("Fetching all monsters...");
      fetch(monsterUrl)
        .then((response) => response.json())
        .then((data) => {
       monstersArray = data;
          displayMonsters(currentPage); 
        })
        .catch((error) => console.error("Error fetching monsters:", error));
    }
  
    function displayMonsters(page) {
      console.log(`Displaying monsters for page: ${page}`);
      monsterContainer.innerHTML = ""; 
  
      const startIndex = (page - 1) * monstersPerPage;
      const endIndex = startIndex + monstersPerPage;
  
      const monstersToShow = monstersArray.slice(startIndex, endIndex); 
  
      monstersToShow.forEach((monster) => {
        const monsterName = document.createElement("h2");
        monsterName.textContent = monster.name;
        monsterContainer.appendChild(monsterName);
  
        const monsterAge = document.createElement("h4");
        monsterAge.textContent = "Age: " + monster.age + " ID: " + monster.id;
        monsterContainer.appendChild(monsterAge);
  
        const monsterDescription = document.createElement("p");
        monsterDescription.textContent = "Bio: " + monster.description;
        monsterContainer.appendChild(monsterDescription);
      });
  
      backButton.disabled = currentPage === 1;
      forwardButton.disabled = endIndex >= monstersArray.length;
    }
  
    function createMonsterForm() {
      const monsterForm = document.createElement("form");
      monsterForm.className = "monster-form";
      createMonsterDiv.appendChild(monsterForm);
  
      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.placeholder = "name...";
      monsterForm.appendChild(nameInput);
  
      const ageInput = document.createElement("input");
      ageInput.type = "text";
      ageInput.placeholder = "age...";
      monsterForm.appendChild(ageInput);
  
      const descriptionInput = document.createElement("input");
      descriptionInput.type = "text";
      descriptionInput.placeholder = "description...";
      monsterForm.appendChild(descriptionInput);
  
      const submitButton = document.createElement("button");
      submitButton.type = "submit";
      submitButton.innerText = "Create";
      monsterForm.appendChild(submitButton);
  
      monsterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = nameInput.value;
        const age = ageInput.value;
        const description = descriptionInput.value;
  
        const newMonster = {
          name: name,
          age: age,
          description: description,
        };
  
        fetch(monsterUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(newMonster),
        })
          .then((response) => response.json())
          .then((data) => {
           monstersArray.push(data); // Add the new monster to the array
            displayMonsters(currentPage); 
          })
          .catch((error) => console.error("Error creating monster:", error));
      });
    }
  
    const backButton = document.getElementById("back");
    const forwardButton = document.getElementById("forward");
  
    backButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        displayMonsters(currentPage); 
      }
    });
  
    forwardButton.addEventListener("click", () => {
      if (currentPage * monstersPerPage < monstersArray.length) {
        currentPage++;
        displayMonsters(currentPage); 
      }
    });
  
    createMonsterForm();
    fetchMonstersArray(); 
  });




