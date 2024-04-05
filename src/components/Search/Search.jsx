import { Field, Form, Formik } from "formik";

const Search = ({ onSetSearchQuery, searchQuery }) => {
  return (
    <Formik
      initialValues={{ query: searchQuery ?? "" }}
      onSubmit={(values) => {
        onSetSearchQuery(values.query);
      }}
    >
      <Form>
        <Field placeholder="Name films" type="text" name="query" />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
};

export default Search;
