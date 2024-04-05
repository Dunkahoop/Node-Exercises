import { List } from "@mui/material";
import User from "./user";
import UserMessage from "./usermessage";

const UserList = (props) => {
  let users = props.users.map((user, idx) => {
    //return <User key={idx} user={user} />;
    return <UserMessage key={idx} user={user} />;
  });
  return <List>{users}</List>;
};
export default UserList;
