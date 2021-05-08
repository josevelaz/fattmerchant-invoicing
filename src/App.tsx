import React from "react";
import { Layout } from "./components/layout";
import { useApi } from "./api";
import { Form, Field } from "react-final-form";
import { StyledInput } from "./components/input";
import { Column, Table } from "./components/table";
import Select from "react-select";

function App() {
  const { client } = useApi();
  const [items, setItems] = React.useState<any>([]);
  const [customers, setCustomers] = React.useState<any>([]);
  const table_columns: Column[] = [
    {
      key: "id",
      formatter: (id) => (
        <Field component="input" type="checkbox" name="line_items" value={id} />
      ),
      classes: "w-12 px-4",
    },
    {
      key: "item",
      label: "Item",
      classes: "w-1/10",
    },
    {
      key: "details",
      label: "Details",
      classes: "w-3/5",
    },
    {
      key: "in_stock",
      label: "Quantity",
      classes: "text-right",
    },
    {
      key: "is_discount",
      label: "Discount",
      classes: "text-center",
      formatter: (v) => (
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden="true"
            className={`absolute inset-0 bg-${
              v ? "green" : "red"
            }-200 opacity-50 hover:opacity-75 rounded-full`}
          />
          <span className="relative pointer-events-none">
            {v ? "Yes" : "No"}
          </span>
        </span>
      ),
    },
  ];

  React.useEffect(() => {
    client.get("/item").then(({ data }) => setItems(data.data));
    client.get("/customer").then(({ data }) => setCustomers(data.data));
  }, []);

  const calculateTotal = (values) => {
    if (values) {
      const items_array = values.map((v) => items.find((x) => x.id === v));
      return items_array.reduce((sum, i) => (sum += i.price * i.in_stock), 0);
    }
    return 0;
  };

  return (
    <Layout>
      <Form onSubmit={(values) => {}}>
        {({ handleSubmit, values }) => (
          <form className="w-2/3 space-y-4" onSubmit={handleSubmit}>
            <p className="text-right text-lg font-bold">
              Invoice Total: $
              {calculateTotal(values["line_items"])
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            <div className="flex items-end justify-between">
              <Field
                name="memo"
                type="text"
                render={({ input }) => (
                  <StyledInput
                    label="Invoice Memo"
                    classes="w-1/2"
                    {...input}
                  />
                )}
              />
              <Field
                name="customer"
                render={({ input }) => (
                  <Select
                    {...input}
                    placeholder="Select a Customer"
                    options={customers.map((v) => ({
                      value: v.id,
                      label: `${v.lastname}, ${v.firstname}`,
                    }))}
                    width="15rem"
                    styles={{
                      container: (provided, state) => ({
                        ...provided,
                        width: state.selectProps.width,
                      }),
                    }}
                  />
                )}
              />
            </div>
            <Table columns={table_columns} data={items} />
          </form>
        )}
      </Form>
    </Layout>
  );
}

export default App;
