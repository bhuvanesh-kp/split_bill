import './App.css';
import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({children,onClick}){
  return <button className="button" onClick={onClick}>{children}</button>
}

function App() {
  const [friends,setFriends] = useState(initialFriends);
  const [showFriend,setShowFriend] = useState(false);
  const [selectFriend,setSelectFriend] = useState(null);

  function handleShowFriend(){
    setShowFriend((show)=>!show);
  }

  function handleAddFriend(friend){
    setFriends((friends)=>[...friends,friend]);
    setShowFriend(false);
  }

  function handleSelection(friend){
    setSelectFriend((cur)=>(cur?.id===friend.id?null:friend));
    setShowFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FrindsList friends={friends} onSelection={handleSelection} selectedFriend={selectFriend}></FrindsList>

        {showFriend && <FormAddFriend onAddFriend={handleAddFriend}></FormAddFriend>}

        <Button onClick={handleShowFriend}>{showFriend?"close":"Add friend"}</Button>

      </div>
        {selectFriend && <FormSplitBill selectedFriend={selectFriend}></FormSplitBill>}
    </div>
  );
}

function FrindsList({friends,onSelection,selectedFriend}) {
  return (
    <ul>{
      friends.map((friend) => <Friend friend={friend} key={friend.id} onSelection={onSelection} selectFriend={selectedFriend}></Friend>)
    }</ul>
  );
}

function Friend({ friend ,onSelection, selectFriend}) {

  const isSelected = selectFriend?.id===friend.id;

  return (
    <li className={isSelected?"selected":""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (<p className="red">
        You owe {Math.abs(friend.balance)}$ to {friend.name}
      </p>)}
      {friend.balance > 0 && (<p className="green">
        {friend.name} owes you {Math.abs(friend.balance)}$
      </p>)}
      {friend.balance === 0 && (<p>
        You and {friend.name} are even
      </p>)}

      <Button onClick={()=>onSelection(friend)}>{!isSelected?"select":"close"}</Button>
    </li>
  )
}

function FormAddFriend({onAddFriend}){
  const [name,setName] = useState("");
  const [image,setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e){
    const id = crypto.randomUUID();
    e.preventDefault();

    if (!name || !image) return;

    const newFriend = {
      id,
      name,
      image:`${image}?=${id}`,
      balance:0,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label> Friend Name</label>
    <input type="text" onChange={(e)=>setName(e.target.value)}></input>

    <label> Image Text</label>
    <input type="text" onChange={(e)=>setImage(e.target.value)}></input>

    <Button>Select</Button>
  </form>
}

function FormSplitBill({selectedFriend}){
  return (
    <form className="form-split-bill">
      <h2>Enter the name {selectedFriend.name}</h2>

      <label>💸 Bill value</label>
      <input type="text"></input>

      <label>🏌️‍♂️Your expense</label>
      <input type="text"></input>

      <label>🏌️‍♂️{selectedFriend.name} expense</label>
      <input type="text" disabled></input>

      <label>🪙 who is paying the bill</label>
      <select>
        <option value="you">You</option>
        <option valur="friend">{selectedFriend.name}</option>
      </select>

      <Button>split</Button>
    </form>
  );
}

export default App;
