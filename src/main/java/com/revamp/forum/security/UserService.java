package com.revamp.forum.security;

import com.revamp.forum.data.User;
import com.revamp.forum.repositories.UsersRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class UserService implements UserDetailsService {

    private final UsersRepository repository;

    public UserService(UsersRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = repository.findByUserName(userName);
        if(user == null) {
            throw new RuntimeException("User not found: " + userName);
        }
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().name());
        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), Arrays.asList(authority));
    }
}