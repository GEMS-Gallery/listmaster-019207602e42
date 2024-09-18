import Bool "mo:base/Bool";
import Func "mo:base/Func";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

import Array "mo:base/Array";

actor {
  // Define a record type for a shopping list item
  type Item = {
    id: Nat;
    name: Text;
    completed: Bool;
  };

  // Use a stable variable to store the list of items
  stable var items: [Item] = [];

  // Function to add a new item to the list
  public func addItem(name: Text): async Item {
    let newItem = {
      id = items.size();
      name = name;
      completed = false;
    };
    items := Array.append<Item>(items, [newItem]);
    return newItem;
  };

  // Function to toggle the completion status of an item
  public func toggleItem(id: Nat): async ?Item {
    items := Array.map<Item, Item>(items, func (item) {
      if (item.id == id) {
        { id = item.id; name = item.name; completed = not item.completed }
      } else {
        item
      }
    });
    return Array.find<Item>(items, func (item) { item.id == id });
  };

  // Function to delete an item from the list
  public func deleteItem(id: Nat): async Bool {
    let initialSize = items.size();
    items := Array.filter<Item>(items, func (item) { item.id != id });
    return items.size() < initialSize;
  };

  // Query function to get all items
  public query func getItems(): async [Item] {
    return items;
  };
}
