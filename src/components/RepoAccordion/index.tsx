import React, { FC, Fragment, useEffect, useState } from "react";
import { Repository, Users } from "../../type";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";

interface Props {
  data: Users;
}

const RepoAccordion: FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [repository, setRepository] = useState<Repository[]>([]);

  const getRepos = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_GITHUB_URL}/repositories?q=+user:${data.login}`
      );

      if (result.status !== 200) {
        alert("Something went wrong!");
        return;
      }

      const arr: Repository[] = [];
      result.data.items.map((item: Repository) => {
        arr.push({
          id: item.id,
          name: item.name,
          full_name: item.full_name,
          stargazers_count: item.stargazers_count,
        });
      });
      setRepository(arr);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getRepos()
  }, [])
  return (
    <div className="w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center p-2 bg-gray-200 cursor-pointer"
      >
        <div>{data.login}</div>
        <div>{isOpen ? <BiChevronDown /> : <BiChevronUp />}</div>
      </div>
      {repository.length > 0 && isOpen ? (
        <Fragment>
          {repository.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-2">
                <div>{item.full_name}</div>
                <div className="flex justify-center items-center">{item.stargazers_count} <AiFillStar/></div>
            </div>
          ))}
        </Fragment>
      ) : null}
    </div>
  );
};

export default RepoAccordion;
