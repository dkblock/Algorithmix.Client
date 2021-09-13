import React, { useCallback, useState } from "react";
import ListItem from "./list-item";

const List = ({ className, items, onCheck, checkControlType }) => {
  const checkedItems = items.filter((item) => item.checked);
  const [checkedItemIds, setCheckedItemIds] = useState(checkedItems.map((item) => item.id));

  const handleCheckItem = useCallback(
    (itemId, isChecked) => {
      let newCheckedItemIds;

      if (checkControlType === "radio") newCheckedItemIds = [itemId];
      else {
        if (isChecked) newCheckedItemIds = [...checkedItemIds, itemId];
        else newCheckedItemIds = checkedItemIds.filter((id) => id !== itemId);
      }

      setCheckedItemIds(newCheckedItemIds);
      onCheck(newCheckedItemIds);
    },
    [checkControlType, checkedItemIds, onCheck]
  );

  return (
    <ul className={`${className} w-100`}>
      {items.map((item) => (
        <ListItem
          id={item.id}
          key={item.id}
          primaryText={item.primaryText}
          secondaryText={item.secondaryText}
          isSelected={item.isSelected}
          index={item.index}
          onClick={item.onClick}
          actions={item.actions}
          button={item.button}
          children={item.content}
          onCheck={onCheck ? handleCheckItem : null}
          checked={checkedItemIds.includes(item.id)}
          checkControlType={checkControlType}
        />
      ))}
    </ul>
  );
};

export default List;
