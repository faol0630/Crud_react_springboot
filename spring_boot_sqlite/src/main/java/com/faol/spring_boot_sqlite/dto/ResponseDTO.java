package com.faol.spring_boot_sqlite.dto;

import com.faol.spring_boot_sqlite.entities.User1;
import lombok.*;

import java.util.List;


@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDTO {

    private String message;
    private List<User1> usersList;
}
