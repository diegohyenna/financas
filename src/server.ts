import { createServer, Model } from "miragejs";
import { items } from "./data/items";
import { addOnDate, subtractOnDate } from "./helpers/dateFilter";

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
            date: addOnDate(new Date(Date.now()), "day", 1),
            category: "food",
            title: "McDonalds",
            value: 32.12,
          },
          {
            date: addOnDate(new Date(Date.now()), "day", 2),
            category: "food",
            title: "Burger King",
            value: 28,
          },
          {
            date: addOnDate(new Date(Date.now()), "day", 2),
            category: "rent",
            title: "Aluguel Apt",
            value: 2300,
          },
          {
            date: addOnDate(new Date(Date.now()), "day", 5),
            category: "salary",
            title: "Salário ACME",
            value: 4500,
          },
          {
            date: subtractOnDate(new Date(Date.now()), "day", 5),
            category: "food",
            title: "ifood",
            value: 567.98,
          },
          {
            date: addOnDate(new Date(Date.now()), "month", 1),
            category: "salary",
            title: "Salário ACME",
            value: 4500,
          },
          {
            date: addOnDate(new Date(Date.now()), "month", 1),
            category: "rent",
            title: "Aluguel",
            value: 2500,
          },
        ],
        categories: [
          { type: "food", title: "Alimentação", color: "blue", expense: true },
          { type: "rent", title: "Aluguel", color: "brown", expense: true },
          { type: "salary", title: "Salário", color: "green", expense: false },
        ],
      });
    },

    routes() {
      this.namespace = "api";

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

      this.get("categories", () => {
        return this.schema.all("categories");
      });

      this.post("categories", (schema, request) => {
        const data = JSON.parse(request.requestBody);
        return schema.create("categories", data);
      });
    },
  });
}
