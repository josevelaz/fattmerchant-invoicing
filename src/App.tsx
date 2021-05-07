import React from "react";
import { Layout } from "./layout";
import { useApi } from "./api";
import { Form, Field } from "react-final-form";
import { StyledInput } from "./components/input";

function App() {
  const { client } = useApi();
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    client.get("/item").then(({ data }) => setItems(data.data));
  }, []);
  return (
    <Layout>
      <Form onSubmit={values => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="memo"
              render={({ input }) => <StyledInput label="Memo" {...input} />}
            />
          </form>
        )}
      </Form>
    </Layout>
  );
}

export default App;
