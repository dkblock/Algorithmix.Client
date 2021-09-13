import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { showZoomImageModal } from "../../../store/actions/account";
import "./zoom-image.scss";

const ZoomImage = ({ className, src, alt }) => {
  const dispatch = useDispatch();

  const handleImageClick = useCallback(() => {
    dispatch(showZoomImageModal({ src, alt }));
  }, [alt, dispatch, src]);

  return <img className={`${className} zoom-image`} src={src} alt={alt} onClick={handleImageClick} />;
};

export default ZoomImage;
