package com.faol.spring_boot_sqlite.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AutoDTO {

    private Long idAuto;
    private String brand;
    private Integer year;
    private Double price;
}
