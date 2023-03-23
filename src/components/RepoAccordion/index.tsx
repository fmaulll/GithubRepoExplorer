import React, { FC, Fragment, useEffect, useState } from "react";
import { Repository, Users } from "../../type";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";
import { setIsLoading } from "../../features/uiSlice";
import { useDispatch } from "react-redux";
import { GithubUrl } from "../../helper";

interface Props {
  data: Users;
}

const RepoAccordion: FC<Props> = ({ data }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [repository, setRepository] = useState<Repository[]>([]);

  const getRepos = async () => {
    if (repository.length > 0) {
      return;
    }
    dispatch(setIsLoading(true));
    try {
      const result = await axios.get(
        `${GithubUrl}/repositories?q=+user:${data.login}`
      );

      if (result.status !== 200) {
        dispatch(setIsLoading(false));
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
          description: item.description,
        });
      });
      setRepository(arr);
      dispatch(setIsLoading(false));
    } catch (error) {
      setIsOpen(false);
      alert(error);
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="w-full mt-2">
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          getRepos();
        }}
        className="flex justify-between items-center p-2 bg-gray-200 cursor-pointer"
      >
        <div>{data.login}</div>
        <div>
          {isOpen ? <BiChevronDown size={30} /> : <BiChevronUp size={30} />}
        </div>
      </div>
      {repository.length > 0 && isOpen && (
        <Fragment>
          {repository.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start p-2 bg-gray-300 my-2"
            >
              <div className="flex flex-col">
                <div className="font-bold">{item.full_name}</div>
                <div className="text-sm">
                  {item.description ? item.description : "No description"}
                </div>
              </div>
              <div className="flex justify-center items-center">
                {item.stargazers_count} <AiFillStar />
              </div>
            </div>
          ))}
        </Fragment>
      )}
      {repository.length < 1 && isOpen && (
        <div className="text-center mt-4">No Repository</div>
      )}
    </div>
  );
};

export default RepoAccordion;
