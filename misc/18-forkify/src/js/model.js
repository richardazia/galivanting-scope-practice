import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function(id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const res = await fetch(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUlr: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cooktingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    };
    console.log(state.recipe);
  } catch (err) {
    console.error(`getJSON error: ${err}`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} query failed, please try again`)
  }
};

export const getSearchResultsPage = function(page = state.search.page) {
  state.search.page = page;
  const start = (page -1) * state.search.resultsPerPage; // 0;
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // formula: new quant = old quant * new servings / old servings
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addbookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  // persistBookmarks();
};

// export const deleteBookmark = function (id) {
//   const index = state.bookmarks.findIndex(el => el.id === id); 
//   state.bookmarks.splice(index, 1);

//   if (id === state.recipe.id) state.recipe.bookmarked = false;

//   persistBookmarks();
// };

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init(); 

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

