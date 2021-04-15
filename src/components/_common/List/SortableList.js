import React, { useCallback, useEffect, useState } from "react";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import arrayMove from "array-move";
import { Icon, iconTypes } from "../Icon";
import ListItem from "./ListItem";

const SortableList = ({ items, onSwap, onCheck, checkControlType }) => {
  const checkedItems = items.filter((item) => item.checked);
  const [listItems, setListItems] = useState(items);
  const [checkedItemIds, setCheckedItemIds] = useState(checkedItems.map((item) => item.id));

  useEffect(() => {
    setListItems(items);
  }, [items]);

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

  const handleSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      const newItems = arrayMove(listItems, oldIndex, newIndex);
      setListItems(newItems);
      onSwap(newItems, oldIndex, newIndex);
    },
    [listItems, onSwap]
  );

  return (
    <SortableComponent
      helperClass="list"
      distance={1}
      lockAxis="y"
      items={listItems}
      onSortEnd={handleSortEnd}
      useDragHandle
      onCheck={onCheck ? handleCheckItem : null}
      checkedItemIds={checkedItemIds}
      checkControlType={checkControlType}
    />
  );
};

const SortableComponent = SortableContainer(({ items, onCheck, checkedItemIds, checkControlType }) => (
  <ul>
    {items.map((item, index) => (
      <SortableItem
        key={item.id}
        index={index}
        value={item}
        onCheck={onCheck}
        checkedItemIds={checkedItemIds}
        checkControlType={checkControlType}
      />
    ))}
  </ul>
));

const Draggable = SortableHandle(() => <Icon type={iconTypes.draggable} />);
const SortableItem = SortableElement(({ value: item, onCheck, checkedItemIds, checkControlType }) => (
  <ListItem
    id={item.id}
    primaryText={item.primaryText}
    secondaryText={item.secondaryText}
    isSelected={item.isSelected}
    index={item.index}
    onClick={item.onClick}
    actions={item.actions}
    button={item.button}
    children={item.content}
    onCheck={onCheck ?? null}
    checked={checkedItemIds.includes(item.id)}
    checkControlType={checkControlType}
    Draggable={Draggable}
  />
));

export default SortableList;
