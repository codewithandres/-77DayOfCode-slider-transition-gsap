// This file contains helper functions for selecting and creating DOM elements
const select = (elem) => document.querySelector(elem);
const selectAll = (elem) => Array.from(document.querySelectorAll(elem));
// Helper function to create a new DOM element
const create = (elem) => document.createElement(elem);

export { select, selectAll, create };
