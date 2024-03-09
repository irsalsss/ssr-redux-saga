import { prefetchGetContactsQuery } from "@/api/contact/@query/use-get-contacts/use-get-contacts";
import ContactContainer from "@/components/contact/contact-container/contact-container";
import queryClient from "@/utils/query-client/query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

const ContactsPage = () => {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ContactContainer />
    </HydrationBoundary>
  );
};

export const getServerSideProps = async () => {
  await prefetchGetContactsQuery();

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ContactsPage;
