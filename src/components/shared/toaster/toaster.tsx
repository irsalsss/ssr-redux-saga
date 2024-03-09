import { ToastContainer, ToastOptions, toast } from "react-toastify";

export const notify = (message: string, options?: ToastOptions) =>
  toast(message, options);

const Toaster = () => {
  return <ToastContainer autoClose={3000} />;
};

export default Toaster;
