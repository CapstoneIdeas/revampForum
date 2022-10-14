package com.revamp.forum.repositories;

import com.revamp.forum.data.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<User, Long> {
        User findByUserName(String userName);
        User findByEmail(String email);
}
