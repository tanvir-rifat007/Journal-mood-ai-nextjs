import { createNewUser } from "@/actions/newUser";

const NewUserPage = async () => {
  await createNewUser();
  return <></>;
};

export default NewUserPage;
