import { RootState } from "@/reducers/root.reducer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const wrapperReactQuery = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export const WrapperRedux = ({
  initialState,
  children,
}: {
  children: ReactNode;
  initialState: RootState;
}) => {
  const mockStore = configureStore();
  const store = mockStore(initialState);

  return <Provider store={store}>{children}</Provider>;
};
