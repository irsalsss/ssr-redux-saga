import ButtonIcon from "@/components/shared/button-icon/button-icon";
import Tab from "@/components/shared/tab/tab";
import ContactTabEnum from "@/enum/contact/contact-tab.enum";
import SortByEnum from "@/enum/shared/sort-by.enum";
import { contactActions } from "@/reducers/contact.reducer";
import { useAppDispatch, useAppSelector } from "@/store/store";
import useContactStore from "@/stores/contact/use-contact-store";
import { TextAlignBottomIcon, TextAlignTopIcon } from "@radix-ui/react-icons";
import { memo, useMemo } from "react";
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
  const dispatch = useAppDispatch();

  const sortBy = useAppSelector((state) => state.contact.contact.filter.sortBy);

  const [activeTab, setActiveTab] = useContactStore(
    useShallow((state) => [state.activeTab, state.setActiveTab])
  );

  const handleSort = () => {
    dispatch(contactActions.setSortBy());
  };

  const handleClickTab = (value: string) => {
    setActiveTab(value as ContactTabEnum);
  };

  const isAscending = useMemo(() => {
    return sortBy === SortByEnum.ASC;
  }, [sortBy]);

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

export default memo(ContactTab);
