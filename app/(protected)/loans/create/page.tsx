import { getBooks } from "../../books/actions";
import CreateLoanForm from "./create-loan-form";
import { createLoan, getPerson } from "../actions";

const CreateLoan = async () => {
  const books = await getBooks();
  const students = await getPerson();

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
