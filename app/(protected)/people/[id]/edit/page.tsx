import { updatePerson, getPerson } from "../../actions";
import EditPersonForm from "./edit-person-form";

const PersonEdit = async ({ params }: { params: { id: string } }) => {
  const personData = await getPerson(params.id);

  return <EditPersonForm personData={personData} updatePerson={updatePerson} />;
};

export default PersonEdit;
