package com.faol.spring_boot_sqlite.dto;

import com.faol.spring_boot_sqlite.entities.Auto;

public class AutoToAutoDTO {

    public AutoDTO autoToAutoDTO(Auto auto){

        AutoDTO autoDTO = new AutoDTO();

        autoDTO.setIdAuto(auto.getIdAuto());
        autoDTO.setBrand(auto.getBrand());
        autoDTO.setYear(auto.getYear());
        autoDTO.setPrice(auto.getPrice());

        return autoDTO;
    }
}
