const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealEl = document.getElementById("single-meal");
const clear = document.getElementById("clear");

// search meal and fetch from api
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  single_mealEl.innerHTML = "";

  // Get search term
  const term = search.value;

  // Check for empty search
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = "<p>There are no search results. Try again!</p>";
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              meal => `
              <div class="meal"> 
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                <div class= "meal-info" data-mealID="${meal.idMeal}">
                  <h3>${meal.strMeal}</h3> 
                </div>
              </div>`
            )
            .join("");
        }
      });

    search.value = "";
  } else {
    alert("Please enter a search term");
  }
}

function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// fetch random meal
function getRandomMeal() {
  // clear meals and heading
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 0; i < 20; i++) {
    if (meal[`strIngredient${i + 1}`]) {
      ingredients.push(
        `${meal[`strIngredient${i + 1}`]} - ${meal[`strMeasure${i + 1}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
        </ul>
      </div>
    </div>  
  `;
}

function clearPage() {
  single_mealEl.innerHTML = "";
  meals.innerHTML = "";
  resultHeading.innerHTML = "";
}

// event listeners
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);
clear.addEventListener("click", clearPage);

mealsEl.addEventListener("click", e => {
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealID");
    getMealById(mealID);
  }
});
