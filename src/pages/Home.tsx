import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../components/Button";
import Card from "../components/Card";
import RepoAccordion from "../components/RepoAccordion";
import Search from "../components/Search";
import { setIsLoading } from "../features/uiSlice";
import { Users } from "../type";

const Home = () => {
  const dispatch = useDispatch();
  const [usersData, setUsersData] = useState<Users[]>([]);
  const [search, setSearch] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setIsLoading());
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_GITHUB_URL}/users?q=${search}`,
        {
          params: {
            per_page: 5,
          },
          headers: {
            Authorization: import.meta.env.VITE_TOKEN,
          },
        }
      );

      if (result.status !== 200) {
        dispatch(setIsLoading());
        alert("Something went wrong!");
        return;
      }

      const arr: Users[] = [];
      result.data.items.map((item: any) => {
        arr.push({
          id: item.id,
          login: item.login,
        });
      });
      setUsersData(arr);

      dispatch(setIsLoading());
    } catch (error) {
      alert(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Search
          onChange={handleChange}
          className="mb-4"
          placeholder="Enter username"
        />
        <Button>Search</Button>
      </form>
      {usersData.length > 0 ? (
        <div>
          {usersData.map((item) => (
            <RepoAccordion key={item.id} data={item} />
          ))}
        </div>
      ) : null}
    </Card>
  );
};

export default Home;
