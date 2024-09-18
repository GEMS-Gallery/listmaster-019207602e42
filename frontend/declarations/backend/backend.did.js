export const idlFactory = ({ IDL }) => {
  const Item = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'completed' : IDL.Bool,
  });
  return IDL.Service({
    'addItem' : IDL.Func([IDL.Text], [Item], []),
    'deleteItem' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'getItems' : IDL.Func([], [IDL.Vec(Item)], ['query']),
    'toggleItem' : IDL.Func([IDL.Nat], [IDL.Opt(Item)], []),
  });
};
export const init = ({ IDL }) => { return []; };
