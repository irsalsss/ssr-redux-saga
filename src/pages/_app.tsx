import "@/styles/globals.scss";
import { wrapper } from "@/store/store";
import queryClient from "@/utils/query-client/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Component {...props.pageProps} />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
