package com.revamp.forum.controllers;

import com.revamp.forum.data.Category;
import com.revamp.forum.data.CategoryTypes;
import com.revamp.forum.repositories.CategoriesRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/categories", produces = "application/json")
public class CategoriesController {
    private CategoriesRepository categoriesRepository;

    @GetMapping("")
    private List<Category> fetchAllCategories() {
        return categoriesRepository.findAll();
    }

    @GetMapping("/search")
    private Category fetchCategoryByCategoryName(@RequestParam CategoryTypes categoryName) {
        Category category = categoriesRepository.findByCategory(categoryName);
        if (category == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category " + categoryName + " not found");
        }
        return category;
    }
}