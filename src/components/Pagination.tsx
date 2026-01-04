import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const ITEMS_PER_PAGE_OPTIONS = [10, 30, 50];

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">
          Afficher:
        </span>
        <div className="flex gap-2">
          {ITEMS_PER_PAGE_OPTIONS.map((size) => (
            <button
              key={size}
              onClick={() => onItemsPerPageChange(size)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                itemsPerPage === size
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-primary-soft/30 text-text-secondary hover:bg-primary-soft/50'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs font-bold text-text-secondary">
          {startItem}-{endItem} sur {totalItems}
        </span>

        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </Button>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 text-text-secondary font-black"
                  >
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  onClick={() => typeof page === 'number' && onPageChange(page)}
                  className={`h-8 w-8 rounded-lg text-xs font-black transition-all ${
                    currentPage === page
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-text-secondary hover:bg-primary-soft/30'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
