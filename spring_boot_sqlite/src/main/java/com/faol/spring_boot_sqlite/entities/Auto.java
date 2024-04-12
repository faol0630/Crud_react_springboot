package com.faol.spring_boot_sqlite.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Table(name = "auto")
public class Auto {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_auto")
    private Long idAuto;

    @NotNull(message = "brand cannot be null")
    @NotBlank(message = "brand cannot be blank")
    @Size(min = 3, max = 40, message = "brand must be within size range")
    @Column(name = "brand", nullable = false, length = 40)//database level validations (sql)
    private String brand;

    @NotNull(message = "year cannot be null")
    @Min(value= 1950, message = "year must be equal to or greater than 1950")
    @Max(value = 2024, message = "year must be equal or less than 2024")
    @Digits(integer = Integer.MAX_VALUE, fraction = 0, message = "invalid year format")
    @Column(name = "year", nullable = false, length = 4)
    private Integer year;

    @NotNull(message = "price cannot be null")
    @DecimalMax(value = "999999.99", message = "Invalid price format")
    @Column(name = "price", nullable = false)
    private Double price;

}
//ejemplo getAll:
//"autosList": [
//        {
//        "idAuto": 1,
//        "brand": "Honda",
//        "year": 2018,
//        "price": 18000.0
//        },
//        {
//        "idAuto": 2,
//        "brand": "Toyota",
//        "year": 2020,
//        "price": 25000.0
//        },
//        {
//        "idAuto": 3,
//        "brand": "Toyota",
//        "year": 2018,
//        "price": 18000.0
//        },
//        {
//        "idAuto": 4,
//        "brand": "Mazda",
//        "year": 2020,
//        "price": 21000.0
//        },
//        {
//              "idAuto": 5,
//              "brand": "Suzuki",
//              "year": 2015,
//              "price": 15500.0
//         }
//]
