import Head from "next/head";
import { useState } from "react";

const HeadLayout = ({ children, title }) => {
  const [metaTags, setMetaTags] = useState({
    "og:image":
      "https://cdn-images.earthtoday.com/eyJrZXkiOiIvdXNlcnMvMTkwMzcwODY2NjU4OTY2MzIzMi9saW5rcy8xOTMwMzMzOTE1MTI1NzA2NzUyLzAzMmVkMzVkLWM0OTgtNGFmNC04ZmJkLTUyNWI3ZGRhOGQ5OC1wcmVzc2tpdC5wbmciLCJidWNrZXQiOiJlYXJ0aHRvZGF5LXByb2QtaW1hZ2VzIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4NDB9fX0=",
    "fb:app_id": "356721174733993",
    "og:type": "website",
    "og:site_name": "EarthToday",
    "og:title": "EarthToday",
    "og:url": "https://myamznsite.vercel.app/",
    "og:description": "What’s happening on EarthToday",
  });

  const metaTagsArray = (metaTags) => {
    if (!metaTags) {
      return [];
    }

    return Object.keys(metaTags).map((key) => {
      return {
        key,
        content: metaTags ? metaTags[key] : "",
      };
    });
  };

  const metaTagsTwitterArray = (metaTags) => {
    if (!metaTags) {
      return [];
    }

    return Object.keys(metaTags).map((key) => {
      return {
        key: key.replace("og", "twitter"),
        content: metaTags ? metaTags[key] : "",
      };
    });
  };

  const metaData = metaTagsArray(metaTags);
  const metaTwitterData = metaTagsTwitterArray(metaTags);
  metaTags;

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/8364-amazon_102478.png" />
        {metaData.map((meta) => (
          <meta name={meta.key} content={meta.content} key={meta.key} />
        ))}
        {metaTwitterData.map((meta) => (
          <meta name={meta.key} content={meta.content} key={meta.key} />
        ))}
        <meta property="og:image:width" content="720" />
        <meta property="og:image:height" content="480" />
        <meta property="og:rich_attachment" content="true" />
      </Head>
      {children}
    </>
  );
};

export default HeadLayout;
