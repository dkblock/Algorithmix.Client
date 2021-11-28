import React from "react";
import { useSelector } from "react-redux";
import { Icon, iconTypes } from "../../_common/icon";
import { Loader } from "../../_common/loader";
import colors from "../../../constants/colors";
import palette from "../../../utils/palette";

const AlgorithmDesignerStatus = () => {
  const { isSaving } = useSelector((state) => state.algorithmDesign);

  return (
    <div className="algorithm-design-status">
      <div className="algorithm-design-status__content" style={{ color: palette.primary.main }}>
        {!isSaving ? (
          <>
            <Icon color={colors.primary} type={iconTypes.done} />
            <span>Всё сохранено</span>
          </>
        ) : (
          <>
            <Loader color={colors.primary} size="small" />
            <span>Сохранение изменений...</span>
          </>
        )}
      </div>
    </div>
  );
};

export default AlgorithmDesignerStatus;
