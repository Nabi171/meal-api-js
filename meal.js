const searchFoods = () => {
    const inputField = document.getElementById
        ('input-field');
    const inputText = inputField.value;
    if (inputText === '') {
        alert('unavailable data');
    }
    // console.log(inputText);
    // else if (inputText !== "string") {
    //     alert('this is unavaildata');
    // }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
        fetch(url).then(res => res.json()).then(data => displayFoods(data.meals));
    }

    inputField.value = '';
}
const displayFoods = meals => {
    const loadSpinner = document.getElementById('spinner-display');
    loadSpinner.style.display = "none";
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    if (!meals) {
        alert('unavailable')
    }
    meals?.forEach(meal => {
        console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="displaydetails(${meal.idMeal})" class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body p-2">
            <h5 class="card-title fw-bolder">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
        </div>
    </div>
   `;
        cardContainer.appendChild(div);
    });

};

const displaydetails = (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    // console.log(url);
    fetch(url).then(res => res.json()).then(data => displaydetailsbtn(data.meals[0]));
};

const displaydetailsbtn = (meal) => {
    const detailsContainer = document.getElementById('details-contaiener');
    detailsContainer.innerHTML = `
<img src="${meal.strMealThumb}" class="card-img-top" alt="...">
<div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
    <a href="${meal.strYoutube}" class="btn btn-primary">YOUTUBE</a>
</div>
`;
}