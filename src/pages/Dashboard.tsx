import { useState, useEffect, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import type { Comment, FilterState, SortDirection } from "../types"; 

const Dashboard = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize filters with defaults
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    sortColumn: null,
    sortOrder: null,
    currentPage: 1,
    pageSize: 10,
  });

  // Fetch comments data
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/comments"
        );
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters.currentPage]);

  // Filter and sort logic
  const filteredAndSortedComments = useMemo(() => {
    let result = [...comments];

    // Apply search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(
        (comment) =>
          comment.name.toLowerCase().includes(searchLower) ||
          comment.email.toLowerCase().includes(searchLower) ||
          comment.body.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    if (filters.sortColumn && filters.sortOrder) {
      result.sort((a, b) => {
        let aValue: string | number = "";
        let bValue: string | number = "";

        if (filters.sortColumn === "postId") {
          aValue = a.postId;
          bValue = b.postId;
        } else if (filters.sortColumn === "name") {
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
        } else if (filters.sortColumn === "email") {
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
        }

        if (aValue < bValue) return filters.sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return filters.sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [comments, filters.searchTerm, filters.sortColumn, filters.sortOrder]);

  // Paginate data
  const paginatedComments = useMemo(() => {
    const startIndex = (filters.currentPage - 1) * filters.pageSize;
    const endIndex = startIndex + filters.pageSize;
    return filteredAndSortedComments.slice(startIndex, endIndex);
  }, [filteredAndSortedComments, filters.currentPage, filters.pageSize]);

  // Handlers
  const handleSearch = (searchTerm: string) => {
    setFilters((prev) => ({
      ...prev,
      searchTerm,
      currentPage: 1,
    }));
  };

  const handleSort = (column: "postId" | "name" | "email") => {
    setFilters((prev) => {
      if (prev.sortColumn !== column) {
        return {
          ...prev,
          sortColumn: column,
          sortOrder: "asc",
          currentPage: 1,
        };
      }

      let newSortOrder: SortDirection = null;
      if (prev.sortOrder === null) {
        newSortOrder = "asc";
      } else if (prev.sortOrder === "asc") {
        newSortOrder = "desc";
      } else {
        newSortOrder = null;
      }

      return {
        ...prev,
        sortColumn: newSortOrder === null ? null : column,
        sortOrder: newSortOrder,
        currentPage: 1,
      };
    });
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setFilters((prev) => ({
      ...prev,
      pageSize,
      currentPage: 1,
    }));
  };

  const getSortIndicator = (column: "postId" | "name" | "email") => {
    if (filters.sortColumn !== column) return "⇅";
    if (filters.sortOrder === "asc") return "↑";
    if (filters.sortOrder === "desc") return "↓";
    return "⇅";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top controls */}
        <div className="bg-gray-50 mb-4 p-1 rounded-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleSort("postId")}
                className={`px-4 py-2 rounded-lg shadow text-sm border transition ${
                  filters.sortColumn === "postId"
                    ? "bg-slate-800 text-white border-slate-800"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Sort Post ID {getSortIndicator("postId")}
              </button>
              <button
                onClick={() => handleSort("name")}
                className={`px-4 py-2 rounded-lg shadow text-sm border transition ${
                  filters.sortColumn === "name"
                    ? "bg-slate-800 text-white border-slate-800"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Sort Name {getSortIndicator("name")}
              </button>
              <button
                onClick={() => handleSort("email")}
                className={`px-4 py-2 rounded-lg shadow text-sm border transition ${
                  filters.sortColumn === "email"
                    ? "bg-slate-800 text-white border-slate-800"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Sort Email {getSortIndicator("email")}
              </button>
            </div>
            <SearchBar value={filters.searchTerm} onChange={handleSearch} />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-slate-200 border-b border-slate-300">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-700 w-20 text-center">
                    Post ID
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-700 w-48 text-center">
                    Name
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-700 w-56 text-center">
                    Email
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-700 text-center">
                    Comment
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedComments.length > 0 ? (
                  paginatedComments.map((comment) => (
                    <tr
                      key={comment.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 text-gray-900 text-center">
                        {comment.postId}
                      </td>
                      <td className="px-4 py-3 text-gray-900 text-center">
                        {comment.name}
                      </td>
                      <td className="px-4 py-3 text-gray-900 text-center">
                        {comment.email}
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-center">
                        {comment.body.length > 100
                          ? `${comment.body.substring(0, 80)}...`
                          : comment.body}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No comments found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Section (separated) */}
        {filteredAndSortedComments.length > 0 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={filters.currentPage}
              totalItems={filteredAndSortedComments.length}
              pageSize={filters.pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
