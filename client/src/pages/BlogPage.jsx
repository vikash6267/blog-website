import React, { useEffect, useState } from "react";
import { getSingleBlog, topThreeBlogAPI, updateViewAPI } from "../Api/BlogAPI";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import BlogCard from "../components/BlogCard";
import loaderimage from "../image/loader.gif";
import frameImg from "../assests/images/frame.png";
import "./BlogPage.css";
function BlogPage() {
  const [blogPage, setBlogPage] = useState("");
  const [loader, setLoader] = useState(false);
  const [topThreeBlog, setTopThreeBlog] = useState("");
  const [arr1, setArr1] = useState([]);

  const updateViewFunc = (blog_id) => {
    try {
      updateViewAPI(blog_id).then((res) => {
        if (res.status === 200) {
          //console.log("View Updated!");
        } else {
          console.log(res);
        }
      });
    } catch (error) {}
  };

  const getBlogPageFunc = (id) => {
    setLoader(true);
    try {
      getSingleBlog(id).then((res) => {
        if (res.status === 200) {
          setBlogPage(res?.data?.data);
          updateViewFunc(res?.data?.data?._id);
          setArr1(JSON.parse(res?.data?.data?.tags_id?.tags));
          setLoader(false);
        } else {
          console.log("Data Fetching Failed!");
        }
      });
    } catch (error) {}
  };

  const topThreeBlogFunc = () => {
    try {
      topThreeBlogAPI(id).then((res) => {
        if (res.status === 200) {
          setTopThreeBlog(res?.data?.data);
        } else {
          console.log("Data Fetching Failed!");
        }
      });
    } catch (error) {}
  };

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getBlogPageFunc(id);
    }
  }, [id]);

  useEffect(() => {
    topThreeBlogFunc();
  }, []);

  function formatDateTime(timestamp) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      //hour: "numeric",
      //minute: "numeric",
      //second: "numeric",
    };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  }
  return (
    <>
      <Header />

      {loader ? (
        <div className="loader">
          <div>
            <img src={loaderimage} alt="loader" className="w-20 h-20" />
          </div>
        </div>
      ) : (
        <>
          <main>
            <article>
              <header className="hd-blog">
                <p>
                  Published {formatDateTime(blogPage?.createdAt)}{" "}
                  <span> ({blogPage?.view} views) </span>
                </p>
                <h1>{blogPage?.title}</h1>
                {/*<p className="mt-6 text-lg text-gray-700">
              You're doing marketing the wrong way
  </p>*/}
                <div className="tags" aria-label="Tags">
                  {arr1 && arr1?.length > 0 ? (
                    <>
                      {arr1?.map((item, index) => (
                        <button className="tag-btn" key={index}>
                          {item}
                        </button>
                      ))}
                    </>
                  ) : null}
                </div>

                <div className="img-con-one ">
                  <div>
                    <img
                      src={frameImg}
                      alt="Pattern"
                      width={758}
                      height={504}
                      loading="lazy"
                    />
                    <img
                      src={blogPage.image}
                      alt="Blogs"
                      width={558}
                      height={504}
                      loading="lazy"
                      className="main-img "
                    />
                  </div>
                </div>
              </header>

              <div className="blog-start">
                <strong>{blogPage?.title}</strong>
                <p>{blogPage?.description}</p>
              </div>
            </article>
          </main>

          <div className="hr-line">
            <div></div>
            <div></div>
            <div></div>
          </div>

          <aside aria-label="Related Articles" className="ending">
            <h2>Top Viewed Post</h2>

            <div className="card-one">
              {topThreeBlog && topThreeBlog.length > 0 ? (
                <>
                  {topThreeBlog.map((item, index) => (
                    <article key={index}>
                      <BlogCard item={item} />
                    </article>
                  ))}
                </>
              ) : null}
            </div>
          </aside>
        </>
      )}
    </>
  );
}

export default BlogPage;
