package com.faol.spring_boot_sqlite.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class User1ResponseDTO {

    private String message;
    private Long id;
    private String name;
    private String lastname;
    private String email;
    private int age;
}
