package com.revamp.forum.repositories;

import com.revamp.forum.data.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostsRepository extends JpaRepository<Post, Long> {

}
