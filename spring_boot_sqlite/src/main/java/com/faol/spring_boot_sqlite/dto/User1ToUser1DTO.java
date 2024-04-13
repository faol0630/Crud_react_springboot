package com.faol.spring_boot_sqlite.dto;

import com.faol.spring_boot_sqlite.entities.User1;

public class User1ToUser1DTO {

    public User1DTO user1ToUser1DTO (User1 user1){

        User1DTO user1DTO = new User1DTO();

        user1DTO.setId(user1.getId());
        user1DTO.setName(user1.getName());
        user1DTO.setLastname(user1.getLastname());
        user1DTO.setEmail(user1.getEmail());
        user1DTO.setAge(user1.getAge());

        // Assigning only the idAuto to User1DTO
        if(user1.getAuto() != null) {
            user1DTO.setAutoId(user1.getAuto().getIdAuto());
        }

        return user1DTO;

    }
}
