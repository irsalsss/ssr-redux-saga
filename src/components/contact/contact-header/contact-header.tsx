import Button from "@/components/shared/button/button";
import ModalTypeEnum from "@/enum/shared/modal-type.enum";
import ContactSearch from "../contact-search/contact-search";
import { contactDetailActions } from "@/reducers/contact-detail/contact-detail.reducer";
import { useAppDispatch } from "@/store/store";
import { memo } from "react";

const ContactHeader = () => {
  const dispatch = useAppDispatch();

  const handleOpenModalAdd = () => {
    dispatch(
      contactDetailActions.openModalContact({
        type: ModalTypeEnum.ADD,
        id: 0,
      })
    );
  };

  return (
    <div className='flex flex-wrap items-center justify-between w-full px-4 gap-4'>
      <h3>Contact List</h3>

      <ContactSearch />

      <Button label='Add' onClick={handleOpenModalAdd} />
    </div>
  );
};

export default memo(ContactHeader);
