package com.faol.spring_boot_sqlite.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Builder
@Table(name = "user1")
public class User1 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 3, max = 40, message = "name must be within size range")
    @NotNull(message = "name cannot be null")
    @NotBlank(message = "name cannot be blank")
    @Column(name = "name", nullable = false, length = 40)//database level validations (sql)
    private String name;

    @NotNull(message = "lastname cannot be null")
    @NotBlank(message = "lastname cannot be blank")
    @Size(min = 3, max = 40, message = "lastname must be within size range")
    @Column(name = "lastname", nullable = false, length = 40)
    private String lastname;

    @NotNull(message = "email cannot be null")
    @NotBlank(message = "email cannot be blank")
    @Size(min = 8, max = 60, message = "email must be within size range")
    @Email(message = "invalid email format")
    @Column(name = "email", nullable = false, length = 60)
    private String email;

    @NotNull(message = "age cannot be null")
    @Digits(integer = Integer.MAX_VALUE, fraction = 0, message = "invalid age format")
    @Positive(message = "age must be a positive number")
    @Min(value= 18, message = "age must be equal to or greater than 18")
    @Max(value = 120, message = "age must be equal or less than 120")
    @Column(name = "age", nullable = false, length = 3)
    private int age;

}
