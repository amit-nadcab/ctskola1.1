import React from "react";
import {useSelector } from "react-redux";

export default function BlogArea(props) {
  const { webData } = useSelector((state) => state.websiteDBReducer);
  return (
    <section className="our_blog_area clearfix section-padding-100-0" id="blog">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-heading text-center">
              {/* <!-- Dream Dots --> */}
              <div
                className="dream-dots justify-content-center fadeInUp"
                data-wow-delay="0.2s"
              >
                <span>Blog Posts</span>
              </div>
              <h2 className="fadeInUp" data-wow-delay="0.3s">
                Latest News
              </h2>
              <p className="fadeInUp" data-wow-delay="0.4s">
               Daily media article published by reputed news channel's about {webData.website_title} Exchange and it's token
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {/* <!-- Single Blog Post --> */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="single-blog-area fadeInUp" data-wow-delay="0.2s">
              {/* <!-- Post Thumbnail --> */}
              <div className="blog_thumbnail">
                <img src="/img/blog-img/1.jpg" alt="" />
              </div>
              {/* <!-- Post Content --> */}
              <div className="blog-content">
                {/* <!-- Dream Dots --> */}

                <div className="post-meta mt-20">
                  <p>
                    By{" "}
                    <a href="#" className="post-author">
                      ADMIN
                    </a>{" "}
                    <a href="#">Apr 10, 2018</a>{" "}
                    <a href="#" className="post-comments">
                      7 comments
                    </a>
                  </p>
                </div>
                <a href="#" className="post-title">
                  <h4>What is this Token for?.</h4>
                </a>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Accusamus fugiat at vitae, ratione sapiente repellat.
                </p>
                <a href="#" className="btn more-btn mt-15">
                  Read Details
                </a>
              </div>
            </div>
          </div>

          {/* <!-- Single Blog Post --> */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="single-blog-area fadeInUp" data-wow-delay="0.3s">
              {/* <!-- Post Thumbnail --> */}
              <div className="blog_thumbnail">
                <img src="/img/blog-img/2.jpg" alt="" />
              </div>
              {/* <!-- Post Content --> */}
              <div className="blog-content">
                {/* <!-- Dream Dots --> */}

                <div className="post-meta mt-20">
                  <p>
                    By{" "}
                    <a href="#" className="post-author">
                      ADMIN
                    </a>{" "}
                    <a href="#">Apr 10, 2018</a>{" "}
                    <a href="#" className="post-comments">
                      7 comments
                    </a>
                  </p>
                </div>
                <a href="#" className="post-title">
                  <h4>The most powerful Token</h4>
                </a>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Accusamus fugiat at vitae, ratione sapiente repellat.
                </p>
                <a href="#" className="btn more-btn mt-15">
                  Read Details
                </a>
              </div>
            </div>
          </div>

          {/* <!-- Single Blog Post --> */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="single-blog-area fadeInUp" data-wow-delay="0.4s">
              {/* <!-- Post Thumbnail --> */}
              <div className="blog_thumbnail">
                <img src="/img/blog-img/3.jpg" alt="" />
              </div>
              {/* <!-- Post Content --> */}
              <div className="blog-content">
                {/* <!-- Dream Dots --> */}

                <div className="post-meta mt-20">
                  <p>
                    By{" "}
                    <a href="#" className="post-author">
                      ADMIN
                    </a>{" "}
                    <a href="#">Apr 10, 2018</a>{" "}
                    <a href="#" className="post-comments">
                      7 comments
                    </a>
                  </p>
                </div>
                <a href="#" className="post-title">
                  <h4>How to get trial version</h4>
                </a>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Accusamus fugiat at vitae, ratione sapiente repellat.
                </p>
                <a href="#" className="btn more-btn mt-15">
                  Read Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
