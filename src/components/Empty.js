import { ReactComponent as EmptySvg } from "../assets/empty.svg";
import Result from "./Result";

const Empty = ({ message, title }) => {
  return <Result image={<EmptySvg />} subTitle={message} title={title} />;
};

export default Empty;
