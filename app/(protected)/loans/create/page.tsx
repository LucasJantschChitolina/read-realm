import { getBooks } from "../../books/actions";
import CreateLoanForm from "./create-loan-form";
import { createLoan } from "../actions";
import { getPeople } from "../../people/actions";

const CreateLoan = async () => {
  const books = await getBooks();
  const students = await getPeople();

  return (
    <div className="p-4 flex gap-4 flex-col items-center">
      <CreateLoanForm
        books={books}
        createLoan={createLoan}
        students={students}
      />
    </div>
  );
};

export default CreateLoan;
