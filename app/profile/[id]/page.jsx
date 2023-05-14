'use client';

import { useState, useEffect } from 'react';

import Profile from '@components/Profile';

const OtherUserProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (params.id) fetchPosts();
  }, []);

  return (
    <Profile
      name={posts[0].creator.username}
      desc={`Welcome to ${posts[0].creator.username}'s profile page`}
      data={posts}
    />
  );
};

export default OtherUserProfile;
