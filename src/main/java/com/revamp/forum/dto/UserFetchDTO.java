package com.revamp.forum.dto;


import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
/**
 * this is the user dto returned when calling /api/users (or fetch all users)
 */
public class UserFetchDTO {
    private Long id;
    private String userName;
    // set PFP TBD
}