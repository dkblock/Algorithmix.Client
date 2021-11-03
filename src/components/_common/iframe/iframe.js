import React, { useEffect, useRef, useState } from "react";
import { getFileSrc } from "../../../utils/get-file-src";

const Iframe = ({src}) => {
  const iframeRef = useRef();
  const [iframeHeight, setIframeHeight] = useState(200);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      setIframeHeight(event.data + 50);
    });
  }, []);

  const handleLoad = () => {
    if (iframeRef) {
      iframeRef.current.contentWindow.postMessage("", "*");
    }
  };

  return (
    <iframe
      ref={iframeRef}
      frameBorder={0}
      src={src}
      style={{ width: "100%", height: iframeHeight + "px" }}
      onLoad={handleLoad}
    />
  );
};

export default Iframe;
