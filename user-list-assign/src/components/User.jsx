import React, { useState, useEffect } from "react";
import { fetchUserData } from "./fetchData";
import "./User.css";
const User = () => {
   const [data, setData] = useState("");

   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      getData();
   }, []);

   const getData = () => {
      setIsLoading(true);
      fetchUserData()
         .then((res) => {
            setData(res.data.data);
         })
         .catch((err) => {
            console.log(err);
         })
         .finally(() => {
            setIsLoading(false);
         });
   };

   return (
      <>
         {!isLoading ? (
            <div className="container">
               {data &&
                  data.map((item) => (
                     <div className="card">
                        <img src={item.avatar} alt={item.email} />
                        <h5>
                           <span>Name : </span>
                           {item.first_name} {item.last_name}
                        </h5>

                        <p>
                           <span>Email : </span>
                           {item.email}
                        </p>
                     </div>
                  ))}
            </div>
         ) : (
            "Loading..."
         )}
      </>
   );
};

export { User };
