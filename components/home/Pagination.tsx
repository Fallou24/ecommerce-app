import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function ProductsPagination({
  page,
  isPlaceholderData,
  setPage,
  totalPages,
}: {
  page: number;
  isPlaceholderData: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}) {
  return (
    <div className="mb-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem
            onClick={() => setPage((old) => (old === 1 ? old : old - 1))}
          >
            <PaginationPrevious href="#" />
          </PaginationItem>
          {[...Array(totalPages)].map((value: any, index: number) => (
            <PaginationItem key={index + 1} onClick={() => setPage(index + 1)}>
              <PaginationLink href="#">{index + 1}</PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem
            onClick={() => {
              if (!isPlaceholderData) {
                setPage((old) => (old < totalPages ? old + 1 : old));
              }
            }}
          >
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
