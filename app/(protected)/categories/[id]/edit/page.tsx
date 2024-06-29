import { getCategory, updateCategory } from "../../actions";
import EditCategoryForm from "./edit-category-form";

const CategoryEdit = async ({ params }: { params: { id: string } }) => {
  const categoryData = await getCategory(params.id);

  const updateCategoryWithId = updateCategory.bind(null, categoryData.id);

  return (
    <EditCategoryForm
      updateCategoryWithId={updateCategoryWithId}
      categoryName={categoryData.name}
    />
  );
};

export default CategoryEdit;
