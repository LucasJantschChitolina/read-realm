import { createPerson } from "../actions";
import CreatePersonForm from "./create-person-form";

const CreatePerson = () => {
  return <CreatePersonForm createPerson={createPerson} />;
};

export default CreatePerson;
