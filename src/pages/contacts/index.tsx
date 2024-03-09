import ContactContainer from "@/components/contact/contact-container/contact-container";
import ContactActionEnum from "@/enum/contact/contact-action.enum";
import { useAppSelector, wrapper } from "@/store/store";
import { END } from "redux-saga";

const ContactsPage = () => {
  const contact = useAppSelector((state) => state.contact.contact);
  console.log("contact", contact);

  return <ContactContainer />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (storeWrapper) => async () => {
    storeWrapper.dispatch({ type: ContactActionEnum.FETCH_CONTACT_REQUEST });

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
