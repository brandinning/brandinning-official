import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS, getBlogPost, getRelatedPosts } from "@/lib/blogs";
import { getSiteChrome } from "@/lib/getSiteChrome";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) {
    return {
      title: "Article Not Found — BrandInning",
      description: "The requested article could not be found.",
    };
  }

  const excerpt =
    post.sections[0]?.paragraphs[0]?.substring(0, 155) ||
    `Read ${post.title} on BrandInning.`;

  return {
    title: `${post.title} — BrandInning Blog`,
    description: excerpt,
    alternates: {
      canonical: `https://brandinning.com/blog/${post.slug}/`,
    },
    openGraph: {
      title: `${post.title} — BrandInning Blog`,
      description: excerpt,
      url: `https://brandinning.com/blog/${post.slug}/`,
      siteName: "BrandInning",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — BrandInning Blog`,
      description: excerpt,
      images: [post.image],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(post.slug, 3);
  const { headerHtml, footerHtml } = getSiteChrome();

  return (
    <>
      {/* Site Header & Mobile Navigation */}
      <div dangerouslySetInnerHTML={{ __html: headerHtml }} />

      {/* Main Blog Post Article Container */}
      <main id="main-content" className="brandinning-blog-detail-view" style={{ backgroundColor: "#fbfcfd", minHeight: "100vh" }}>
        
        {/* Breadcrumb & Hero Banner */}
        <section style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #edf2f7", padding: "40px 20px 32px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            
            {/* Breadcrumb navigation */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: "20px", fontSize: "14px", color: "#64748b" }}>
              <Link href="/" style={{ color: "#64748b", textDecoration: "none" }} className="hover:text-orange-500">
                Home
              </Link>
              <span style={{ margin: "0 8px", color: "#94a3b8" }}>/</span>
              <Link href="/blog" style={{ color: "#64748b", textDecoration: "none" }} className="hover:text-orange-500">
                Blog
              </Link>
              <span style={{ margin: "0 8px", color: "#94a3b8" }}>/</span>
              <span style={{ color: "#f26b1d", fontWeight: "600" }}>{post.category}</span>
            </nav>

            {/* Category Tag */}
            <div style={{ marginBottom: "16px" }}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "#fff0e6",
                  color: "#f26b1d",
                  fontSize: "13px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(242, 107, 29, 0.2)",
                }}
              >
                {post.category}
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.85rem)",
                fontWeight: "800",
                lineHeight: "1.25",
                color: "#0a1c2a",
                letterSpacing: "-0.02em",
                marginBottom: "20px",
                maxWidth: "1000px",
              }}
            >
              {post.title}
            </h1>

            {/* Author & Meta bar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "24px",
                paddingTop: "12px",
                borderTop: "1px solid #f1f5f9",
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    backgroundColor: "#0a1c2a",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                >
                  BI
                </div>
                <div>
                  <div style={{ fontWeight: "700", color: "#0a1c2a" }}>{post.author.name}</div>
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>{post.author.role}</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ color: "#f26b1d" }}>
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </svg>
                <span>{post.date}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ color: "#f26b1d" }}>
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                </svg>
                <span>{post.readTime}</span>
              </div>
            </div>

          </div>
        </section>

        {/* Featured Image & Body Section */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px 80px" }}>
          
          {/* Featured Hero Image */}
          <div
            style={{
              marginBottom: "48px",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 12px 36px rgba(0, 0, 0, 0.08)",
              border: "1px solid #e2e8f0",
              backgroundColor: "#f8fafc",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "560px",
                objectFit: "cover",
                display: "block",
              }}
              loading="eager"
            />
          </div>

          {/* Grid Layout: Main Article (Left) + Sticky Sidebar (Right) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
              alignItems: "start",
            }}
          >
            
            {/* Main Article Content */}
            <article style={{ minWidth: 0, flex: "1 1 65%" }}>
              
              {/* Strategic Intro Callout */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderLeft: "4px solid #f26b1d",
                  borderRadius: "8px",
                  padding: "24px 28px",
                  marginBottom: "36px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  border: "1px solid #edf2f7",
                  borderLeftWidth: "4px",
                }}
              >
                <p style={{ margin: 0, fontSize: "17px", lineHeight: "1.75", color: "#1e293b", fontWeight: "500", fontStyle: "italic" }}>
                  &ldquo;In an era defined by AI search algorithms and discerning consumers, digital growth belongs to brands that combine technical excellence with authentic, value-driven positioning.&rdquo;
                </p>
              </div>

              {/* Dynamic Blog Sections */}
              {post.sections.map((section, idx) => (
                <div key={idx} style={{ marginBottom: "40px" }} id={`section-${idx}`}>
                  <h2
                    style={{
                      fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)",
                      fontWeight: "700",
                      color: "#0a1c2a",
                      lineHeight: "1.35",
                      marginBottom: "16px",
                      position: "relative",
                      paddingLeft: "16px",
                      borderLeft: "4px solid #f26b1d",
                    }}
                  >
                    {section.heading}
                  </h2>

                  {section.paragraphs.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      style={{
                        fontSize: "16.5px",
                        lineHeight: "1.85",
                        color: "#334155",
                        marginBottom: "18px",
                      }}
                    >
                      {para}
                    </p>
                  ))}

                  {section.bullets && section.bullets.length > 0 && (
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "20px 0 24px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      {section.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                            backgroundColor: "#ffffff",
                            padding: "14px 18px",
                            borderRadius: "10px",
                            border: "1px solid #f1f5f9",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                            fontSize: "15.5px",
                            lineHeight: "1.65",
                            color: "#1e293b",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "22px",
                              height: "22px",
                              borderRadius: "50%",
                              backgroundColor: "#fff0e6",
                              color: "#f26b1d",
                              flexShrink: 0,
                              marginTop: "2px",
                              fontWeight: "700",
                              fontSize: "12px",
                            }}
                          >
                            ✓
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Author Bio Box */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  padding: "32px",
                  border: "1px solid #e2e8f0",
                  marginTop: "50px",
                  marginBottom: "40px",
                  display: "flex",
                  gap: "24px",
                  alignItems: "center",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundColor: "#f26b1d",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "800",
                    fontSize: "22px",
                    flexShrink: 0,
                  }}
                >
                  BI
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0a1c2a", margin: "0 0 6px" }}>
                    Written by {post.author.name}
                  </h3>
                  <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.65", color: "#64748b" }}>
                    BrandInning is a premier full-service digital agency specializing in search engine optimization, performance brand marketing, and high-conversion engineering. We help brands turn experiences into predictable revenue.
                  </p>
                </div>
              </div>

              {/* Back to blog navigation */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #edf2f7", paddingTop: "28px" }}>
                <Link
                  href="/blog"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#0a1c2a",
                    fontWeight: "600",
                    textDecoration: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                  }}
                  className="hover:border-orange-500 hover:text-orange-500"
                >
                  <span>← Back to All Articles</span>
                </Link>

                <Link
                  href="/contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "#f26b1d",
                    color: "#ffffff",
                    fontWeight: "600",
                    textDecoration: "none",
                    padding: "10px 22px",
                    borderRadius: "8px",
                  }}
                  className="hover:opacity-90"
                >
                  <span>Discuss Your Project →</span>
                </Link>
              </div>

            </article>

            {/* Sidebar Column */}
            <aside style={{ flex: "0 0 340px", minWidth: "280px" }}>
              <div style={{ position: "sticky", top: "120px", display: "flex", flexDirection: "column", gap: "28px" }}>
                
                {/* Growth Strategy Consultation Box */}
                <div
                  style={{
                    backgroundColor: "#0a1c2a",
                    color: "#ffffff",
                    borderRadius: "16px",
                    padding: "32px 28px",
                    boxShadow: "0 16px 32px rgba(10, 28, 42, 0.15)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-40px",
                      right: "-40px",
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(242, 107, 29, 0.2)",
                    }}
                  />
                  <span
                    style={{
                      display: "inline-block",
                      backgroundColor: "#f26b1d",
                      color: "#ffffff",
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      marginBottom: "14px",
                    }}
                  >
                    FREE STRATEGY SESSION
                  </span>
                  <h3 style={{ fontSize: "21px", fontWeight: "700", lineHeight: "1.3", margin: "0 0 12px", color: "#ffffff" }}>
                    Accelerate Your Growth in 2026
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.65", color: "#94a3b8", margin: "0 0 20px" }}>
                    Schedule a confidential 30-minute growth call with BrandInning strategists to uncover hidden conversion bottlenecks.
                  </p>
                  <Link
                    href="/contact"
                    style={{
                      display: "block",
                      textAlign: "center",
                      backgroundColor: "#f26b1d",
                      color: "#ffffff",
                      fontWeight: "700",
                      fontSize: "14px",
                      padding: "12px 20px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      transition: "opacity 0.2s",
                    }}
                    className="hover:opacity-90"
                  >
                    Claim Free Strategy Call →
                  </Link>
                  <div style={{ marginTop: "16px", textAlign: "center", fontSize: "13px", color: "#94a3b8" }}>
                    Or call direct: <a href="tel:+193-940-9845" style={{ color: "#ffffff", fontWeight: "600", textDecoration: "none" }}>+193-940-9845</a>
                  </div>
                </div>

                {/* Table of Contents Card */}
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "24px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                  }}
                >
                  <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#0a1c2a", margin: "0 0 16px" }}>
                    In This Article
                  </h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                    {post.sections.map((section, sIdx) => (
                      <li key={sIdx}>
                        <a
                          href={`#section-${sIdx}`}
                          style={{
                            fontSize: "13.5px",
                            color: "#475569",
                            textDecoration: "none",
                            lineHeight: "1.4",
                            display: "block",
                          }}
                          className="hover:text-orange-500"
                        >
                          {sIdx + 1}. {section.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Category Explorer */}
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "24px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                  }}
                >
                  <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#0a1c2a", margin: "0 0 14px" }}>
                    Explore Topics
                  </h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {["SEO & AI Search", "Web Design & UX", "Branding Strategy", "Social Media & PPC", "Local Marketing"].map((cat, cIdx) => (
                      <Link
                        key={cIdx}
                        href="/blog"
                        style={{
                          fontSize: "12px",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          backgroundColor: "#f8fafc",
                          color: "#475569",
                          border: "1px solid #e2e8f0",
                          textDecoration: "none",
                          fontWeight: "500",
                        }}
                        className="hover:border-orange-500 hover:text-orange-500"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </aside>

          </div>
        </section>

        {/* Related Articles Section */}
        {related.length > 0 && (
          <section style={{ backgroundColor: "#ffffff", borderTop: "1px solid #edf2f7", padding: "64px 20px 80px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px" }}>
                <div>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#f26b1d", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    CONTINUE READING
                  </span>
                  <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#0a1c2a", margin: "4px 0 0" }}>
                    Recommended Articles
                  </h2>
                </div>
                <Link
                  href="/blog"
                  style={{
                    color: "#f26b1d",
                    fontWeight: "600",
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
                  className="hover:underline"
                >
                  View All Blogs →
                </Link>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "28px",
                }}
              >
                {related.map((rel) => (
                  <article
                    key={rel.slug}
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "14px",
                      overflow: "hidden",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    className="hover:shadow-lg hover:-translate-y-1"
                  >
                    <Link href={`/blog/${rel.slug}`} style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", height: "100%" }}>
                      <div style={{ height: "200px", overflow: "hidden", backgroundColor: "#f1f5f9" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={rel.image}
                          alt={rel.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                          loading="lazy"
                        />
                      </div>
                      <div style={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "700",
                            color: "#f26b1d",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            marginBottom: "8px",
                          }}
                        >
                          {rel.category}
                        </span>
                        <h3
                          style={{
                            fontSize: "17px",
                            fontWeight: "700",
                            lineHeight: "1.4",
                            color: "#0a1c2a",
                            margin: "0 0 14px",
                            flexGrow: 1,
                          }}
                        >
                          {rel.title}
                        </h3>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: "#94a3b8", borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
                          <span>{rel.date}</span>
                          <span>{rel.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Site Footer */}
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </>
  );
}
