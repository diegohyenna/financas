const getItems = () => {
  return fetch("api/items").then(async (result) => {
    return await result.json();
  });
};
const getCategories = () => {
  return fetch("/api/categories").then(async (result: any) => {
    return await result.json();
  });
};

export { getItems, getCategories };
