import ButtonIcon from "@/components/shared/button-icon/button-icon";
import Tab from "@/components/shared/tab/tab";
import ContactTabEnum from "@/enum/contact/contact-tab.enum";
import useContactStore from "@/stores/contact/use-contact-store";
import { TextAlignBottomIcon, TextAlignTopIcon } from "@radix-ui/react-icons";
import { useShallow } from "zustand/react/shallow";

const tabOptions = [
  {
    label: "All",
    value: ContactTabEnum.ALL,
  },
  {
    label: "Favorites",
    value: ContactTabEnum.FAVORITES,
  },
];

const ContactTab = () => {
  const [activeTab, setActiveTab, isAscending, setIsAscending] =
    useContactStore(
      useShallow((state) => [
        state.activeTab,
        state.setActiveTab,

        state.isAscending,
        state.setIsAscending,
      ])
    );

  const handleSort = () => {
    setIsAscending(!isAscending);
  };

  const handleClickTab = (value: string) => {
    setActiveTab(value as ContactTabEnum);
  };

  return (
    <div className='flex items-center justify-between px-4 mt-4'>
      <Tab
        options={tabOptions}
        onClickTab={handleClickTab}
        defaultValue={activeTab}
      />

      <ButtonIcon
        label={isAscending ? "asc-icon" : "desc-icon"}
        onClick={handleSort}
      >
        {isAscending ? <TextAlignTopIcon /> : <TextAlignBottomIcon />}
      </ButtonIcon>
    </div>
  );
};

export default ContactTab;
