import Button from "@/components/shared/button/button";
import Input from "@/components/shared/input/input";
import ModalTypeEnum from "@/enum/shared/modal-type.enum";
import useContactStore, {
  defaultContact,
} from "@/stores/contact/use-contact-store";
import { createQueryString } from "@/utils/create-query-string/create-query-string";
import { useDebounce } from "@/utils/use-debounce/use-debounce";
import useHasMounted from "@/utils/use-has-mounted/use-has-mounted";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

const Header = () => {
  const pathname = usePathname();
  const { push } = useRouter();

  const query = useSearchParams();
  const hasMounted = useHasMounted();

  const qSearch = query.get("search") ?? "";

  const [value, setValue] = useState(qSearch);
  const debouncedValue = useDebounce<string>(value, 500);

  const [setSearch, setActiveModalContact] = useContactStore(
    useShallow((state) => [state.setSearch, state.setActiveModalContact])
  );

  const handleSearch = (keyword: string) => {
    setValue(keyword);
  };

  const handleOpenModalAdd = () => {
    setActiveModalContact({
      ...defaultContact,
      type: ModalTypeEnum.ADD,
    });
  };

  useEffect(() => {
    if (hasMounted) {
      push(
        pathname +
          "?" +
          createQueryString(query.toString(), "search", debouncedValue)
      );
      setSearch(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div className='flex flex-wrap items-center justify-between w-full px-4 gap-4'>
      <h3>Contact List</h3>

      <Input
        type='text'
        placeholder='search anything here...'
        onChange={(e) => handleSearch(e.target.value)}
        value={value}
        icon={<MagnifyingGlassIcon />}
      />

      <Button label='Add' onClick={handleOpenModalAdd} />
    </div>
  );
};

const ContactHeader = () => {
  return (
    <Suspense>
      <Header />
    </Suspense>
  );
};

export default ContactHeader;
