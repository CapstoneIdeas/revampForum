package com.revamp.forum.controllers;

import java.util.ArrayList;
import com.revamp.forum.data.FieldHelper;
import com.revamp.forum.data.User;
import com.revamp.forum.data.UserRole;
import com.revamp.forum.dto.UserFetchDTO;
import com.revamp.forum.repositories.UsersRepository;
import com.revamp.forum.services.AuthBuddy;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

    @CrossOrigin
    @AllArgsConstructor
    @RestController
    @RequestMapping(value = "/api/users", produces = "application/json")
    public class UsersController {
        private UsersRepository usersRepository;
//        private PasswordEncoder passwordEncoder;
        private AuthBuddy authBuddy;
//        @GetMapping("")
//        public List<User> fetchUsers() {
//            return usersRepository.findAll();
//        }
        @GetMapping("/{id}")
        public Optional<User> fetchUserById(@PathVariable long id) {
            Optional<User> optionalUser = usersRepository.findById(id);
            if(optionalUser.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User " + id + " not found");
            }
            return optionalUser;
        }
        @GetMapping("")
        public List<UserFetchDTO> fetchUsers(){
            List<User> users = usersRepository.findAll();
            List<UserFetchDTO> userDTOs = new ArrayList<>();
            for (User user : users ){
                UserFetchDTO userDTO = new UserFetchDTO();
                userDTO.setId(user.getId());
                userDTO.setUserName(user.getUserName());
                userDTOs.add(userDTO);
            }
            return userDTOs;
        }
        @GetMapping("/authinfo")
        private UserFetchDTO getUserAuthInfo(@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader) {
            User loggedInUser = authBuddy.getUserFromAuthHeader(authHeader);

            // use email to lookup the user's info
            UserFetchDTO userDTO = new UserFetchDTO();
//            userDTO.setEmail(loggedInUser.getEmail());
//            userDTO.setRole(loggedInUser.getRole());
            userDTO.setUserName(loggedInUser.getUserName());
//            userDTO.setProfilePic(loggedInUser.getProfilePic());
            return userDTO;
        }
        @GetMapping("/me")
        private User fetchMe(@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader) {
            User loggedInUser = authBuddy.getUserFromAuthHeader(authHeader);
            return loggedInUser;
        }
        @PostMapping("/create")
        public void createUser(@RequestBody User newUser) {
            newUser.setRole(UserRole.USER);
//            String plaintextPassword = newUser.getPassword();
//            String encryptedPassword = passwordEncoder.encode(plaintextPassword);
//            newUser.setPassword(encryptedPassword);
            newUser.setCreatedAt(LocalDate.now());
            usersRepository.save(newUser);
        }
        @DeleteMapping("/{id}")
        public void deleteUserById(@PathVariable long id) {
            Optional<User> optionalUser = usersRepository.findById(id);
            if(optionalUser.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User " + id + " not found");
            }
            usersRepository.deleteById(id);
        }
        @PutMapping("/{id}")
        public void updateUser(@RequestBody User updatedUser, @PathVariable long id) {
            Optional<User> optionalUser = usersRepository.findById(id);
            if(optionalUser.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User " + id + " not found");
            }
            User originalUser = optionalUser.get();
            BeanUtils.copyProperties(updatedUser, originalUser, FieldHelper.getNullPropertyNames(updatedUser));
            originalUser.setId(id);
            usersRepository.save(originalUser);
        }
        @PutMapping("/{id}/updatePassword")
        private void updatePassword(@PathVariable Long id, @RequestParam(required = false) String oldPassword, @RequestParam String newPassword) {
            Optional<User> optionalUser = usersRepository.findById(id);
            if (optionalUser.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User " + id + " not found");
            }
            User user = optionalUser.get();
            if (!user.getPassword().equals(oldPassword)) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "amscray");
            }
            if (newPassword.length() < 3) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "new pw length must be at least 3 characters");
            }
            user.setPassword(newPassword);
            usersRepository.save(user);
        }
        /*
public class UsersController {
    private UsersRepository usersRepository;
    private PasswordEncoder passwordEncoder;

    @GetMapping("")
    public List<UserFetchDTO> fetchUsers() {
//        return usersRepository.fetchUserDTOs();
        List<User> users = usersRepository.findAll();
        List<UserFetchDTO> userDTOs = new ArrayList<>();

        for(User user : users) {
            UserFetchDTO userDTO = new UserFetchDTO();
            userDTO.setId(user.getId());
            userDTO.setUserName(user.getUserName());
            userDTO.setEmail(user.getEmail());
            userDTOs.add(userDTO);
        }

        return userDTOs;
    }

    @GetMapping("/{id}")
    public Optional<User> fetchUserById(@PathVariable long id) {
        Optional<User> optionalUser = usersRepository.findById(id);
        if(optionalUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User " + id + " not found");
        }
        return optionalUser;
    }

    @PostMapping("/create")
    public void createUser(@RequestBody User newUser) {
        newUser.setRole(UserRole.USER);

        String plainTextPassword = newUser.getPassword();
        String encryptedPassword = passwordEncoder.encode(plainTextPassword);
        newUser.setPassword(encryptedPassword);
        newUser.setCreatedAt(LocalDate.now());
        usersRepository.save(newUser);
    }
    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable long id) {
        Optional<User> optionalUser = usersRepository.findById(id);
        if(optionalUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User " + id + " not found");
        }
        usersRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public void updateUser(@RequestBody User updatedUser, @PathVariable long id) {
        Optional<User> optionalUser = usersRepository.findById(id);
        if(optionalUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User " + id + " not found");
        }
        // get the user from the optional so we no longer have to deal with the optional
        User originalUser = optionalUser.get();

        // merge the changed data in updatedUser with originalUser
        BeanUtils.copyProperties(updatedUser, originalUser, FieldHelper.getNullPropertyNames(updatedUser));

        // originalUser now has the merged data (changes + original data)
        originalUser.setId(id);

        usersRepository.save(originalUser);
    }

    @PutMapping("/{id}/updatePassword")
    private void updatePassword(@PathVariable Long id, @RequestParam(required = false) String oldPassword, @RequestParam String newPassword) {
        Optional<User> optionalUser = usersRepository.findById(id);
        if(optionalUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User " + id + " not found");
        }
        User user = optionalUser.get();
        if(!user.getPassword().equals(oldPassword)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "amscray");
        }
        if(newPassword.length() < 3) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "new pw length must be at least 3 characters");
        }

        user.setPassword(newPassword);
        usersRepository.save(user);
    }

        */
}
