"use strict";

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from 'regenerator-runtime';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0. Update Results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1. Bookmarks 
    bookmarksView.update(model.state.bookmarks);

    // 2. Fetch/load the recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    // 3. Render the recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1. Search for term
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load search results
    await model.loadSearchResults(query);

    // 3. Render results
    resultsView.render(model.getSearchResultsPage());

    // 4 Render initial pagination
    paginationView.render(model.state.search);

  } catch(err) {
    console.log(err);
  }
};

const controlPagination = function(goToPage) {
  // 1. Render new Results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2. Render new page numbers
  paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
  // update the recipe servings(in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function() {
  // 1. Add or remove bookmarks
  model.addBookmark(model.state.recipe);
  console.log(model.state.recipe);
  // if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  // else model.deleteBookmark(model.state.recipe.id);

  // 2. Update recipe view
  recipeView.update(model.state.recipe);
  // 3 Render bookmarks
  // bookmarksView.render(model.state.bookmarks);

  console.log(model.state.recipe);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
  
const init = function () {
  // bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes); 
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();