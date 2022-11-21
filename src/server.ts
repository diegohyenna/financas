import { createServer, Model, Response } from "miragejs";
import { items } from "./data/items";

export function makeServer({ environment = "test" }) {
  return createServer({
    environment,

    models: {
      items: Model,
      categories: Model,
    },

    seeds(server) {
      server.db.loadData({
        items: [
          {
            date: new Date(2022, 10, 6),
            category: "food",
            title: "McDonalds",
            value: 32.12,
          },
          {
            date: new Date(2022, 10, 15),
            category: "food",
            title: "Burger King",
            value: 28,
          },
          {
            date: new Date(2022, 10, 16),
            category: "rent",
            title: "Aluguel Apt",
            value: 2300,
          },
          {
            date: new Date(2022, 10, 18),
            category: "salary",
            title: "Salário ACME",
            value: 4500,
          },
          {
            date: new Date(2022, 11, 18),
            category: "salary",
            title: "Salário ACME",
            value: 4500,
          },
        ],
      });
    },

    routes() {
      this.namespace = "api";

      // Clinicas
      this.get("items", () => {
        return this.schema.all("items");
      });

      this.get("items/:id", (_, request) => {
        const itemId = request.params.id;

        return (this.schema as any).items.find(itemId);
      });

      this.post("items", (schema, request) => {
        const data = JSON.parse(request.requestBody);
        return schema.create("items", data);
      });

      this.patch("items/:id", (schema, request) => {
        let data = JSON.parse(request.requestBody);
        let id = request.params.id;
        let items = (schema as any).items.find(id);
        return items.update(data);
      });

      this.delete("items/:id", (schema, request) => {
        let id = request.params.id;
        (schema as any).items.find(id).destroy();
        return items;
      });
    },
  });
}
