export default function Home() {
  return <div />;
}

export const getServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: "/contacts",
    },
    props: {},
  };
};
