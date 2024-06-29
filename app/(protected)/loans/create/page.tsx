import { getBooks } from "../../books/actions";
import { getStudents } from "../../people/actions";
import CreateLoanForm from "./create-loan-form";
import {createLoan} from "../actions";

const CreateCategory = async () => {
    const books = await getBooks();
    const students = await getStudents();

    return (
        <div className="p-4 flex gap-4 flex-col items-center">
            <CreateLoanForm books={books} createLoan={createLoan} students={students} />
        </div>
    );
};

export default CreateCategory;
