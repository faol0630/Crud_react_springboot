package com.faol.spring_boot_sqlite.dto;


import com.faol.spring_boot_sqlite.entities.Auto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class User1DTO {

    private Long id;
    private String name;
    private String lastname;
    private String email;
    private int age;
    private Auto auto;

}
