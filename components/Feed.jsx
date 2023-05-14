'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(async () => {
        await fetchPosts(e.target.value);
      }, 500)
    );
  };

  const onTagClick = async (tagValue) => {
    setSearchText(tagValue);
    await fetchPosts(tagValue);
  };

  useEffect(() => {
    fetchPosts(searchText);
  }, []);

  const fetchPosts = async (searchQuery) => {
    console.log(searchQuery);

    const response = await fetch(`/api/prompts?search=${searchQuery}`);
    const data = await response.json();

    setPosts(data);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={onTagClick} />
    </section>
  );
};

export default Feed;
