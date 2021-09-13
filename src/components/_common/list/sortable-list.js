import React, { useCallback, useEffect, useState } from "react";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import arrayMove from "array-move";
import { Icon, iconTypes } from "../icon";
import ListItem from "./list-item";

const SortableList = ({ items, onSwap, onCheck, checkControlType }) => {
  const [listItems, setListItems] = useState(items);
  const [checkedItemIds, setCheckedItemIds] = useState([]);

  useEffect(() => {
    const checkedItems = items.filter((item) => item.checked);

    setListItems(items);
    setCheckedItemIds(checkedItems.map((item) => item.id));
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
  <ul className="w-100">
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
