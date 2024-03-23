import ContactInterface from "@/interfaces/contact/contact.interface";
import style from "./contact-card.module.scss";
import { StarIcon, StarFilledIcon, Pencil2Icon } from "@radix-ui/react-icons";
import ButtonIcon from "@/components/shared/button-icon/button-icon";
import ContactDeleteButton from "../contact-delete-button/contact-delete-button";

interface ContactCardProps {
  contact: ContactInterface;
  isFavorite?: boolean;
  onEditContact: () => void;
  onFavoriteContact: () => void;
}

const ContactCard = ({
  contact,
  isFavorite,
  onEditContact,
  onFavoriteContact,
}: ContactCardProps) => {
  return (
    <div className={style["contact-card-container"]}>
      <div className={style["contact-container"]}>
        <ButtonIcon
          label={isFavorite ? "star-filled-icon" : "star-icon"}
          onClick={onFavoriteContact}
        >
          {isFavorite ? (
            <StarFilledIcon color='#e6b400' />
          ) : (
            <StarIcon color='black' />
          )}
        </ButtonIcon>

        <div className={style["contact-other-information-container"]}>
          <span className='font-bold capitalize'>
            {contact.firstName + " " + contact.lastName}
          </span>

          <div className={style["contact-other-information"]}>
            <span>Job:</span>
            <span>{contact.job}</span>
          </div>

          <div className={style["contact-other-information"]}>
            <span>Description:</span>
            <span>{contact.description}</span>
          </div>
        </div>
      </div>

      <div className={style["contact-action-container"]}>
        <ButtonIcon label='edit-icon' onClick={onEditContact}>
          <Pencil2Icon />
        </ButtonIcon>

        <ContactDeleteButton contact={contact} />
      </div>
    </div>
  );
};

export default ContactCard;
