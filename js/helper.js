const select = (elemet) => document.querySelector(elemet);
const selectAll = (elemet) => Array.from(document.querySelectorAll(elemet));
const create = (element) => document.createElement(element);

export { select, selectAll, create };
