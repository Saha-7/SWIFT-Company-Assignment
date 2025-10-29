interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(currentPage + 1, totalPages - 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-gray-50">
      {/* Showing range */}
      <div className="text-sm text-gray-600">
        {startItem}-{endItem} of {totalItems} items
      </div>

      {/* Page numbers */}
      <div className="flex items-center gap-2">
        {/* Previous Icon */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="border border-gray-300 rounded-full p-1.5 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <img
            src="https://img.icons8.com/ios/50/back--v1.png"
            alt="Previous"
            className="w-4 h-4"
          />
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={`px-2 py-1 border rounded ${
              page === currentPage
                ? "bg-slate-800 text-white border-slate-800"
                : page === "..."
                ? "border-transparent cursor-default"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Icon */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="border border-gray-300 rounded-full p-1.5 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <img
            src="https://img.icons8.com/ios/50/forward--v1.png"
            alt="Next"
            className="w-4 h-4"
          />
        </button>
      </div>

      {/* Page size selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Per Page:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
