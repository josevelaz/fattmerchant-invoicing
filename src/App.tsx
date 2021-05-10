import React from "react";
import { Layout } from "./components/layout";
import { useApi } from "./api";
import { Form, Field } from "react-final-form";
import { StyledInput } from "./components/input";
import { Column, Table } from "./components/table";
import Select from "react-select";
import { Button } from "./components/button";
import { toast } from "react-toastify";
import { FormApi } from "final-form";

interface FormValues {
  memo?: string;
  customer_id?: {
    label: string;
    value: string;
  };
  line_items: string[];
}

const Badge: React.FC<{ isDiscount: boolean }> = (props) => {
  return (
    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
      <span
        aria-hidden="true"
        className={`absolute inset-0 bg-${
          props.isDiscount ? "green" : "red"
        }-200 opacity-50 hover:opacity-75 rounded-full`}
      />
      <span className="relative pointer-events-none">
        {props.isDiscount ? "Yes" : "No"}
      </span>
    </span>
  );
};

function App() {
  const { client } = useApi();
  const [items, setItems] = React.useState<any>([]);
  const [customers, setCustomers] = React.useState<any>([]);
  const [inFlight, setInFlight] = React.useState<boolean>(false);

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
      formatter: (v) => <Badge isDiscount={v} />,
    },
  ];

  React.useEffect(() => {
    client
      .get("/item")
      .then(({ data }) => setItems(data.data))
      .catch(() => toast.error("There has been an error fetching the items"));
    client
      .get("/customer")
      .then(({ data }) => setCustomers(data.data))
      .catch(() =>
        toast.error("There has been an error fetching the customer information")
      );
  }, [client]);

  const calculateTotal = (values) => {
    if (values) {
      const items_array = values.map((v) => items.find((x) => x.id === v));
      return items_array.reduce((sum, i) => (sum += i.price * i.in_stock), 0);
    }
    return 0;
  };

  const handleSubmit = (values: FormValues, form: FormApi<FormValues, any>) => {
    if (values.line_items === undefined || values.line_items.length === 0) {
      toast.error("You must select at least one item.");
      return;
    }
    setInFlight(true);
    client
      .post("/invoice", {
        customer_id: values.customer_id?.value ?? "",
        total: calculateTotal(values.line_items),
        url: "https://omni.fattmerchant.com/#/bill/",
        meta: {
          lineItems: items.map(
            (item) =>
              values.line_items.includes(item.id) && {
                id: item.id,
                item: item.item,
                details: item.details,
                quantity: item.in_stock,
                price: item.price,
              }
          ),
        },
      })
      .then((res) => {
        toast.success("Invoice Successfully Added ✅");
        form.restart();
        setInFlight(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
        setInFlight(false);
      });
  };

  return (
    <Layout>
      <Form onSubmit={handleSubmit}>
        {({ handleSubmit, values, form }) => (
          <div className="w-2/3 space-y-4">
            <div className="flex items-end justify-between">
              <h1>Create an Invoice</h1>
              <p className="text-right text-lg font-bold">
                Invoice Total: $
                {calculateTotal(values["line_items"])
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>
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
                name="customer_id"
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
            <Button label="Submit" disabled={inFlight} onClick={handleSubmit} />
          </div>
        )}
      </Form>
    </Layout>
  );
}

export default App;
