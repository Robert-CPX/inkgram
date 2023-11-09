import GridPostList from "@/components/shared/GridPostList"
import Loader from "@/components/shared/Loader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useDebounce from "@/hooks/useDebounce"
import { useGetInfinitePosts, useSearchPosts } from "@/lib/tanstack-query/queriesAndMutations"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer";

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
};

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  } else {
    return (
      <p className="mt-10 w-full text-center text-light-4">No results found</p>
    );
  }
};

const Explore = () => {
  const { ref, inView } = useInView();
  const [searchValue, setSearchValue] = useState("");

  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedValue);

  const { data: posts, fetchNextPage, hasNextPage } = useGetInfinitePosts();

  const handleFilter = () => {
    console.log("filter")
  }

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);

  if (!posts) {
    return (
      <div className="flex-center h-full w-full">
        <Loader />
      </div>
    );
  }

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts = !shouldShowSearchResults &&
    posts.pages.every((item) => item?.documents.length === 0);

  return (
    <div className="custom-scrollbar mx-3 flex w-full flex-col items-center overflow-scroll px-5 py-10 md:p-14 lg:mx-12">
      <div className="flex w-full max-w-5xl flex-col items-center gap-6 md:gap-9">
        <h2 className="h3-bold md:h2-bold w-full text-left">Search Posts</h2>
        <div className="flex h-[48px] w-full gap-2 rounded-lg bg-dark-4 px-3">
          <img src="assets/icons/search.svg" alt="search" width={24} height={24} />
          <Input
            type="text"
            className="h-12 border-none bg-dark-4 ring-offset-0 placeholder:text-light-4 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}>
          </Input>
        </div>
        <div className="flex w-full items-center justify-between">
          <h2 className="h3-bold md:h2-bold w-full text-left">Popular Today</h2>
          <Button className="base-semibold flex items-center gap-2 bg-dark-4" onClick={handleFilter}>
            All <img src="assets/icons/filter.svg" alt="filter" width={20} height={20} />
          </Button>
        </div>
        <div className="flex w-full max-w-5xl flex-wrap gap-9">
          {shouldShowSearchResults ? (
            <SearchResults
              isSearchFetching={isSearchFetching}
              searchedPosts={searchedPosts}
            />
          ) : shouldShowPosts ? (
            <p className="mt-10 w-full text-center text-light-4">End of posts</p>
          ) : (
            posts.pages.map((item, index) => (
              <GridPostList key={`page-${index}`} posts={item.documents} />
            ))
          )}
        </div>
      </div>
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  )
}

export default Explore
