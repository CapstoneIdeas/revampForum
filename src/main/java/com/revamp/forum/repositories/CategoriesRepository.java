package com.revamp.forum.repositories;

import com.revamp.forum.data.Category;
import com.revamp.forum.data.CategoryTypes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriesRepository extends JpaRepository<Category, Long> {
    Category findByCategory(CategoryTypes category);
}