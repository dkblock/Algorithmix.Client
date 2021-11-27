import React, { useCallback, useEffect, useState } from "react";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import arrayMove from "array-move";
import { Icon, iconTypes } from "../icon";
import ListItem from "./list-item";

const SortableList = ({ items, disabled, onSwap }) => {
  const [listItems, setListItems] = useState(items);

  useEffect(() => {
    setListItems(items);
  }, [items]);

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
      disabled={disabled}
      onSortEnd={handleSortEnd}
      useDragHandle
    />
  );
};

const SortableComponent = SortableContainer(({ items, disabled }) => (
  <ul className="w-100">
    {items.map((item, index) => (
      <SortableItem key={item.id} index={index} value={item} disabled={disabled} />
    ))}
  </ul>
));

const Draggable = SortableHandle(() => <Icon type={iconTypes.draggable} />);
const SortableItem = SortableElement(({ value: item }) => (
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
    Draggable={Draggable}
  />
));

export default SortableList;
