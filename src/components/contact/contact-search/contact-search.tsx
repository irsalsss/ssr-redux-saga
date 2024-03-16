import Input from "@/components/shared/input/input";
import { contactActions } from "@/reducers/contact/contact.reducer";
import { useAppDispatch } from "@/store/store";
import { useDebounce } from "@/utils/use-debounce/use-debounce";
import useHasMounted from "@/utils/use-has-mounted/use-has-mounted";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ContactSearch = () => {
  const dispatch = useAppDispatch();

  const { push, pathname, query } = useRouter();

  const hasMounted = useHasMounted();

  const qSearch = (query["search"] ?? "") as string;

  const [value, setValue] = useState(qSearch);
  const debouncedValue = useDebounce<string>(value, 500);

  const handleSearch = (keyword: string) => {
    setValue(keyword);
  };

  useEffect(() => {
    if (hasMounted) {
      push(
        {
          pathname: pathname,
          query: { search: debouncedValue },
        },
        undefined,
        { shallow: true }
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
