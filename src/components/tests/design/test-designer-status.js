import React from "react";
import { useSelector } from "react-redux";
import { useTestSaving } from "../../../hooks";
import { Icon, iconTypes } from "../../_common/icon";
import { Loader } from "../../_common/loader";
import colors from "../../../constants/colors";
import palette from "../../../utils/palette";

const TestDesignerStatus = () => {
  const { isPublishing } = useSelector((state) => state.testDesign);
  const isTestSaving = useTestSaving();

  const isSaving = isTestSaving && !isPublishing;

  return (
    <div className="test-design-status">
      <div className="test-design-status__content" style={{ color: palette.primary.main }}>
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

export default TestDesignerStatus;
