import logo from "./logo.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import SkeletonLoader from "./components/SkeletonLoader";
import ButtonTray from "./components/ButtonTray";

function App() {
  const users = useSelector(state => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [displayedUser, setDisplayedUser] = useState(null);

  const fetchData = async url => {
    setLoading(true);
    try {
      const rawData = await fetch(url);
      //console.log(rawData);
      if (rawData.status === 200 && rawData.ok) {
        const userList = await rawData.json();
        setLoading(false);
        return [null, userList];
      }
    } catch (err) {
      console.error("Error message: ", err);
      setLoading(false);
      return [err, null];
    }
  };
  const fetchAllPages = async url => {
    let pageCount = 1;
    let [err, userList] = await fetchData(`${url}?page=${pageCount}`);
    //console.log(userList);
    const requests = [];
    while (pageCount < userList.total_pages) {
      pageCount++;
      requests.push(fetchData(`${url}?page=${pageCount}`));
    }
    try {
      const responses = await Promise.all(requests);
      console.log(responses);
      responses.forEach(response => {
        const [err, list] = response;
        if (err) throw err;
        userList.data = userList.data.concat(list.data);
      });
      console.log(userList.data);
      return [null, userList.data];
    } catch (err) {
      return [err, null];
    }
  };
  const handleClick = e => {
    if (e.target.nodeName === "BUTTON") {
      const userid = e.target.id;
      console.log(userid);
      fetchData(`${process.env.REACT_APP_API_END_POINT}/${userid}`)
        .then(response => {
          const [err, user] = response;
          if (err) throw err;
          setDisplayedUser(user);
        })
        .catch(err => {
          console.log("something went wrong!", err);
        });
    }
  };

  useEffect(() => {
    console.log(process.env.REACT_APP_API_END_POINT);
    fetchAllPages(process.env.REACT_APP_API_END_POINT)
      .then(response => {
        console.log(response);
        const [err, userList] = response;
        console.log(userList);
        userList.forEach(user => {
          if (err) throw err;
          dispatch({ type: "ADD_USERS", payload: user });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div className="App">
      {loading && (
        <div className="container">
          <SkeletonLoader firstLoad={users.length === 0} />
        </div>
      )}
      {!loading && users && (
        <div className="container">
          <Card displayData={displayedUser} />
          <ButtonTray
            selectedId={displayedUser && displayedUser.data.id}
            users={users}
            onClick={handleClick}
          />
        </div>
      )}
    </div>
  );
}

export default App;
