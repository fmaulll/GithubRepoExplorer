import React from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Search from "../components/Search";

const Home = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("test")
    }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Search className="mb-4" placeholder="Enter username" />
        <Button>Search</Button>
      </form>
    </Card>
  );
};

export default Home;
