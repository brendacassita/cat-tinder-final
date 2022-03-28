import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

// this page should show unliked cats for a logged in user
const Home = () => {
  const auth = useContext(AuthContext)
  const [cats, setCats] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  // load cats on mount
  useEffect(() => {
    //everyone can do this public api call
    getEveryone()
   
    // only if user
    if(auth.user){
      getCats();
    }
  }, []);

  const getEveryone = async () => {
    try {
      let res = await axios.get("/api/everyone");
      setMessage(res.data);
    } catch (err) {
      setError(err);
    }
  };

  // axios call to get cats
  const getCats = async () => {
    try {
      let res = await axios.get("/api/cats");
      setCats(res.data);
    } catch (err) {
      setError(err);
    }
  };

  // gets a random cat from our cat state
  const sample = () => {
    if (cats.length) {
      // come up with whole number 0 - cats.length -1
      const index = Math.floor(Math.random() * cats.length);
      return cats[index];
    }
    return null;
  };

  // this has no interaction with DB, only UI thing
  const removeCatFromUI = (id) => {
    setCats(cats.filter((cat) => cat.id !== id));
  };

  // will interact with DB (update method in cats controller)
  const upVote = async (id) => {
    // this call add id to the liked_cats in user model
    let res = await axios.put(`/api/cats/${id}`);
    // update UI
    removeCatFromUI(id);
  };

  if (error) return <p>{JSON.stringify(error)}</p>;

  const cat = sample();
  if(!auth.user){
    return (
      <>
        <p>message: { message}</p>
        <p>you need to log in to see cats</p>
      </>
    )
  }
  if (cat) {
    return (
      <>
         <p>message: { message}</p>
        <br />
        <h1>Cat Tinder</h1>
        <br />
        <div key={cat.id}>
          <img src={cat.avatar} />
          <section>
            <h3>{cat.name}</h3>
            <p>{cat.breed}</p>
            <p>{cat.registry}</p>
          </section>
          <section>
            <button onClick={() => removeCatFromUI(cat.id)}>thumbs down</button>
            <button onClick={() => upVote(cat.id)}>thumbs up</button>
          </section>
        </div>
        <Link to="/my_cats">
          <button>My Cats</button>
        </Link>
      </>
    );
  } else {
    return (
      <>
        <h1>No More Cats</h1>
        <Link to="/my_cats">
          <button>My Cats</button>
        </Link>
      </>
    );
  }
};
export default Home;
