
//default item show

const defaultItem = () => {

    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=s`; 
    fetch(url)
        .then(res => res.json())
        .then(data => {
           loadData(data.meals);
        })
}

defaultItem();

document.getElementById('basic-addon2').addEventListener('click', function(){
    const searchInput = document.getElementById('search');
    const searchValue = searchInput.value;
    
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
           loadData(data.meals);
        })

    searchInput.value = "";

});



const loadData = (searchData) => {

    const loodData = document.getElementById('posts');
    loodData.textContent = '';

    if(searchData.length == 0){
        const divError = document.createElement('div');
        const errorDiv = `
        <div class="alert alert-danger" role="alert">
            Search not Found
        </div>
        `;
        divError.innerHTML = errorDiv;
        loodData.appendChild(divError);
    }else{
        searchData.forEach(food => {
            const div = document.createElement('div');
            div.classList.add('col-md-4');
            const divItem = `
             <div onclick="getData(${food.idMeal})" class="card">
                     <img src="${food.strMealThumb}" class="card-img-top" alt="${food.strMeal}">
                     <div class="card-body">
                         <h5 class="card-title">${food.strMeal}</h5>
                         <p class="card-text">Category : ${food.strCategory}</p>
                     </div>
                 </div>
             </div>
            `;
            div.innerHTML = divItem;
            loodData.appendChild(div);
         });
    }

}

const getData = mealId => {
   
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayData(data.meals[0]);
        })

}

const displayData = (foodD) => {

    const setData = document.getElementById('setTheDisplay');
    setData.innerHTML = `
        <div class="card w-50 m-auto mb-4" >
            <img src="${foodD.strMealThumb}" class="card-img-top" alt="">
            <div class="card-body">
            <h5 class="card-title">${foodD.strMeal}</h5>
            <p class="card-text">${foodD.strInstructions}</p>
            <a target="_blank" href="${foodD.strYoutube}" class="btn btn-primary">Watch Youtube</a>
          </div>
        </div>
    `;

    console.log(foodD);

}