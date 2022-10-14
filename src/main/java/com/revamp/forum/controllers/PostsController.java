package com.revamp.forum.controllers;
import com.revamp.forum.data.Category;
import com.revamp.forum.data.FieldHelper;
import com.revamp.forum.data.Post;
import com.revamp.forum.data.User;
import com.revamp.forum.repositories.CategoriesRepository;
import com.revamp.forum.repositories.PostsRepository;
import com.revamp.forum.repositories.UsersRepository;
import com.revamp.forum.services.AuthBuddy;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/posts", produces = "application/json")
public class PostsController {
    private AuthBuddy authBuddy;
    private PostsRepository postsRepository;
    private UsersRepository usersRepository;
    private CategoriesRepository categoriesRepository;
    @GetMapping("")
    public List<Post> fetchPosts() {
        return postsRepository.findAll();
    }
    @GetMapping("/{id}")
    public Optional<Post> fetchPostById(@PathVariable long id) {
        Optional<Post> optionalPost = postsRepository.findById(id);
        if(optionalPost.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post id " + id + " not found");
        }
        return optionalPost;
    }
    @PostMapping("")
    public void createPost(@RequestBody Post newPost, @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader) {
        User author = authBuddy.getUserFromAuthHeader(authHeader);
        if(author == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        newPost.setAuthor(author);
        postsRepository.save(newPost);
    }
    @DeleteMapping("/{id}")
    public void deletePostById(@PathVariable long id) {
        Optional<Post> optionalPost = postsRepository.findById(id);
        if(optionalPost.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post id " + id + " not found");
        }
        postsRepository.deleteById(id);
    }
    @PutMapping("/{id}")
    public void updatePost(@RequestBody Post updatedPost, @PathVariable long id) {
        Optional<Post> originalPost = postsRepository.findById(id);
        if(originalPost.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post " + id + " not found");
        }
        updatedPost.setId(id);
        BeanUtils.copyProperties(updatedPost, originalPost.get(), FieldHelper.getNullPropertyNames(updatedPost));
        postsRepository.save(originalPost.get());
    }
}