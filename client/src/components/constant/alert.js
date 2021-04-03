
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";

toast.configure();
const alert = (name, type) => {
  if (!_.isEmpty(name) && !_.isEmpty(type)) {
    switch (type) {
      case "error":
        toast.error(name);
        break;
      case "success":
        toast.success(name);
        break;
    }
  }
};
export default alert;