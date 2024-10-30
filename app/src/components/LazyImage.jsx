import React from "react";
import useLazyLoad from "../hook/useLazyLoad";

const LazyImage = ({ src, alt, ...props }) => {
  const [source, imgRef] = useLazyLoad(src);

  return (
    <img
      className="w-[100%] md:w-[32%]"
      ref={imgRef}
      src={source}
      alt={alt}
      {...props}
    />
  );
};

export default LazyImage;
