const getItems = () => {
  fetch("api/items").then(async (result) => {
    console.log(await result.json());
  });
};

export { getItems };
