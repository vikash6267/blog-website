import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { getAllBlogs, getBlogs } from "../Api/BlogAPI";
import Header from "../components/Header";
import loaderimage from "../image/loader.gif";
import HighlightText from "../components/core/HighlighTest";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import "./Blog.css";
const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [loader, setLoader] = useState(false);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [sortBy, setSortBy] = useState("createdAt");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterdata, setFilterdata] = useState("");

  const options = [
    { value: "Technology", label: "Technology" },
    { value: "Health", label: "Health" },
    { value: "Finance", label: "Finance" },
    { value: "Travel", label: "Travel" },
    { value: "Food", label: "Food" },
    { value: "Fashion", label: "Fashion" },
    { value: "Lifestyle", label: "Lifestyle" },
    { value: "Parenting", label: "Parenting" },
    { value: "Fitness", label: "Fitness" },
  ];

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchPosts11 = async () => {
      setLoader(true);
      try {
        getBlogs(
          page,
          limit,
          sortBy,
          sortOrder,
          filterdata,
          filterCategory
        ).then((res) => {
          if (res.status === 200) {
            setPosts(res?.data?.data);
            setLoader(false);
          } else {
            console.log(res);
          }
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts11();
  }, [page, sortBy, sortOrder, filterdata, filterCategory]);

  const getAllBlogsFunc = () => {
    try {
      getAllBlogs().then((res) => {
        if (res.status === 200) {
          setTotalBlogs(res?.data?.data?.length);
          //setData(res.data);
          //setLoader(false);
        } else {
          console.log("Data Fetching Failed!");
        }
      });
    } catch (error) {}
  };

  useEffect(() => {
    getAllBlogsFunc();
  }, []);

  return (
    <>
      <Header />

      <div className="wrapper-blog">
        <div className="blog-two">
          <div className="w-full px-4">
            <div className="content-text">
              <span>
                <HighlightText text={" Our Blogs"} />
              </span>
            </div>
          </div>
        </div>

        {/*<div className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-3 sm:gap-6 sm:px-8 md:grid-cols-3">*/}

        <div className="blog-filter">
          <div className="cat">
            <div className="relative p-2">
              <div>
                <label className="sr-only">Select Category:</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="select-cat"
                >
                  <option value="">All Category</option>
                  {options.map((item, index) => (
                    <option value={item.label} key={index}>
                      {item.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="descending">
            <div className="relative p-2">
              <div>
                <label className="sr-only">Sort By Time:</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="select-cat"
                >
                  <option value="" disabled>
                    Sort By Time
                  </option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
          </div>

          <div className="search">
            <div className="srch">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="search-bar">
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                placeholder="Search"
                value={filterdata}
                onChange={(e) => {
                  setFilterdata(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </div>

        {loader ? (
          <div className="loader-main">
            <div>
              <img src={loaderimage} alt="loader" />
            </div>
          </div>
        ) : (
          <>
            <div className="card">
              {posts && posts.length > 0 ? (
                <>
                  {posts.map((item, index) =>
                    item && item.tags_id ? (
                      <article className="" key={index}>
                        <BlogCard item={item} />
                      </article>
                    ) : null
                  )}
                </>
              ) : null}
            </div>

            {posts && posts.length > 0 ? null : (
              <div className="no-blog">
                <h1 className="p-3">No Blog Found..</h1>
              </div>
            )}

            <div className="pagination">
              {totalBlogs !== 0 ? (
                <a>
                  {page} of {Math.ceil(totalBlogs / limit)}
                </a>
              ) : (
                <a>0 of 0</a>
              )}

              <div className="pre-btn">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1}
                >
                  <span>
                    {" "}
                    <GrLinkPrevious /> Previous
                  </span>
                </button>
                {totalBlogs !== 0 ? <a>{page}</a> : <a>0</a>}

                <button
                  disabled={page >= Math.ceil(totalBlogs / limit)}
                  onClick={() => handlePageChange(page + 1)}
                >
                  <span>
                    {" "}
                    Next <GrLinkNext />
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Blog;
