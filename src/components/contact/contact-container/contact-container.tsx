import ContactHeader from "../contact-header/contact-header";
import ContactTab from "../contact-tab/contact-tab";
import ContactList from "../contact-list/contact-list";

const ContactContainer = () => {
  return (
    <div className='p-4'>
      <ContactHeader />

      <ContactTab />

      <ContactList />
    </div>
  );
};

export default ContactContainer;
