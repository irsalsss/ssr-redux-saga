import Input from "@/components/shared/input/input";
import { contactActions } from "@/reducers/contact.reducer";
import { useAppDispatch } from "@/store/store";
import { createQueryString } from "@/utils/create-query-string/create-query-string";
import { useDebounce } from "@/utils/use-debounce/use-debounce";
import useHasMounted from "@/utils/use-has-mounted/use-has-mounted";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ContactSearch = () => {
  const dispatch = useAppDispatch();

  const pathname = usePathname();
  const { push } = useRouter();

  const query = useSearchParams();
  const hasMounted = useHasMounted();

  const qSearch = query.get("search") ?? "";

  const [value, setValue] = useState(qSearch);
  const debouncedValue = useDebounce<string>(value, 500);

  const handleSearch = (keyword: string) => {
    setValue(keyword);
  };

  useEffect(() => {
    if (hasMounted) {
      push(
        pathname +
          "?" +
          createQueryString(query.toString(), "search", debouncedValue)
      );

      dispatch(contactActions.setSearchContact(debouncedValue));
    }
  }, [debouncedValue]);

  return (
    <Input
      type='text'
      placeholder='search anything here...'
      onChange={(e) => handleSearch(e.target.value)}
      value={value}
      icon={<MagnifyingGlassIcon />}
    />
  );
};

export default ContactSearch;
