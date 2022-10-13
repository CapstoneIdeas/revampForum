package com.revamp.forum.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import javax.persistence.*;
import java.util.Collection;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name="categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @Column
//    private String name;
    @Enumerated(EnumType.STRING)
    @Column
    private CategoryTypes category;
    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.DETACH, CascadeType.REFRESH},
            targetEntity = Post.class)
    @JoinTable(
            name="post_category",
            joinColumns = {@JoinColumn(name = "category_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="post_id", nullable = false, updatable = false)}
//            , foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
//            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )
    @JsonIgnoreProperties("categories")
    private Collection<Post> posts;
}