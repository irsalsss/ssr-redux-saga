import "@/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { wrapper } from "@/store/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Toaster from "@/components/shared/toaster/toaster";

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
      <Toaster />
    </Provider>
  );
};

export default App;
