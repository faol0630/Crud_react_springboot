package com.faol.spring_boot_sqlite.services;

import com.faol.spring_boot_sqlite.entities.Auto;
import com.faol.spring_boot_sqlite.entities.User1;

import java.util.List;
import java.util.Optional;

public interface AutoServicesInt {

    List<Auto> getAllAutos();
    Optional<Auto> getAutoById(Long id);
    void saveNewAuto(Auto auto);
    Auto updateAuto(Auto auto, Long id);
    void deleteAuto(Long id);
    void deleteAllAutos();
}
