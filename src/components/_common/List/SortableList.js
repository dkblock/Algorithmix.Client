import React, { useEffect, useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import ListItem from "./ListItem";

const SortableList = ({ items, onSwap }) => {
  const [listItems, setListItems] = useState(items);

  useEffect(() => {
    setListItems(items);
  }, [items]);

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    const newItems = arrayMove(listItems, oldIndex, newIndex);
    setListItems(newItems);
    onSwap(newItems, oldIndex, newIndex);
  };

  return (
    <SortableComponent
      helperClass="list"
      distance={1}
      lockAxis="y"
      items={listItems}
      onSortEnd={handleSortEnd}
    />
  );
};

const SortableComponent = SortableContainer(({ items }) => (
  <ul>
    {items.map((item, index) => (
      <SortableItem key={item.id} index={index} value={item} />
    ))}
  </ul>
));

const SortableItem = SortableElement(({ value: item }) => (
  <ListItem
    className="list-item--draggable"
    primaryText={item.primaryText}
    secondaryText={item.secondaryText}
    isSelected={item.isSelected}
    index={item.index}
    onClick={item.onClick}
    actions={item.actions}
  />
));

export default SortableList;
