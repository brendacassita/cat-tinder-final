import axios from "axios";
import { useState, useEffect } from "react";

const MyCats = () => {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    getCats();
  }, []);

  const getCats = async () => {
    //TODO: error handling
    let res = await axios.get("/api/my_cats");
    setCats(res.data);
  };

  return (
    <>
     <h1>My Cats</h1>
      {cats.map((cat) => {
        return (
          <div key={cat.id}>
            <img src={cat.avatar} />
            <h2>{cat.name}</h2>
            <p>{cat.id}</p>
          </div>
        );
      })}
    </>
  );
};
export default MyCats
