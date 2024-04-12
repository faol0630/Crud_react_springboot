package com.faol.spring_boot_sqlite.dto;

import com.faol.spring_boot_sqlite.entities.Auto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ResponseAutoDTO {

    private String message;
    private List<Auto> autosList;

}
