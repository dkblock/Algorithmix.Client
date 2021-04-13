import React, { useCallback, useState } from "react";
import ListItem from "./ListItem";

const List = ({ className, items, onCheck, checkControlType }) => {
  const checkedItems = items.filter((item) => item.checked);
  const [checkedItemIds, setCheckedItemIds] = useState(checkedItems.map((item) => item.id));

  const handleCheckItem = useCallback(
    (itemId) => {
      let newCheckedItemIds;

      if (checkControlType === "radio") newCheckedItemIds = [itemId];
      else newCheckedItemIds = [...checkedItemIds, itemId];

      setCheckedItemIds(newCheckedItemIds);
      onCheck(newCheckedItemIds);
    },
    [checkControlType, checkedItemIds, onCheck]
  );

  return (
    <ul className={className}>
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
