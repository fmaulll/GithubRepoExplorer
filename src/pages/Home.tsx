import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../components/Button";
import Card from "../components/Card";
import RepoAccordion from "../components/RepoAccordion";
import Search from "../components/Search";
import { setIsLoading } from "../features/uiSlice";
import { GithubUrl } from "../helper";
import { useFormFieldElement } from "../hooks/useFormFieldElement";
import { Users } from "../type";

const Home = () => {
  const dispatch = useDispatch();
  const [usersData, setUsersData] = useState<Users[]>([]);
  const [search, setSearch] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchField = e.currentTarget[0];
    useFormFieldElement(searchField);
    setSearch(searchField.value);
    dispatch(setIsLoading(true));
    try {
      const result = await axios.get(
        `${GithubUrl}/users?q=${searchField.value}`,
        {
          params: {
            per_page: 5,
          },
        }
      );

      if (result.status !== 200) {
        dispatch(setIsLoading(false));
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

      dispatch(setIsLoading(false));
    } catch (error) {
      alert(error);
      dispatch(setIsLoading(false));
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Search className="mb-4" placeholder="Enter username" />
        <Button>Search</Button>
      </form>
      <div className="mt-4 text-gray-500">
        {search ? `Showing users for "${search}"` : null}
      </div>
      <div className="h-[350px] overflow-y-scroll">
        {usersData.length > 0 && (
          <div className="mt-4">
            {usersData.map((item) => (
              <RepoAccordion key={item.id} data={item} />
            ))}
          </div>
        )}
        {usersData.length < 1 && search && (
          <div className="text-center mt-4">No Result</div>
        )}
      </div>
    </Card>
  );
};

export default Home;
