import SortByEnum from "@/enum/shared/sort-by.enum";

interface FilterInterface {
  search?: string;
  sortBy?: SortByEnum;
}

export default FilterInterface;
