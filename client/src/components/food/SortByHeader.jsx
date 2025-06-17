import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import { sortOptions } from '@/constants/filters';

const SortByHeader = ({ sortBy, handleSortChange, total, filtered }) => (
  <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
    <Select value={sortBy} onValueChange={handleSortChange}>
      <SelectTrigger className='w-48'>
        <SelectValue placeholder='Sort by' />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <div className='text-sm text-gray-500'>
      Showing {filtered} of {total} results
    </div>
  </div>
);

export default SortByHeader;
