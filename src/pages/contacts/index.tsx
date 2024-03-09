import ContactContainer from "@/components/contact/contact-container/contact-container";
import { getActionDispatcher } from "@/reducers/contact.reducer";
import { wrapper } from "@/store/store";
import { END } from "redux-saga";

const ContactsPage = () => {
  return <ContactContainer />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (storeWrapper) =>
    async ({ query }) => {
      const search = (query["search"] ?? "") as string;

      storeWrapper.dispatch(getActionDispatcher(search));

      // Stop the saga
      storeWrapper.dispatch(END);
      if (storeWrapper.sagaTask) {
        await storeWrapper.sagaTask.toPromise();
      }

      return {
        props: {},
      };
    }
);

export default ContactsPage;
