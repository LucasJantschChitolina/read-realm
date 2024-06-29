import { createCategory } from "../actions";

import CreateCategoryForm from "./create-category-form";

const CreateCategory = () => {
  return <CreateCategoryForm createCategory={createCategory} />;
};

export default CreateCategory;
