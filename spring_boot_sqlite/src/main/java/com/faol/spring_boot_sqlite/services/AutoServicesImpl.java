package com.faol.spring_boot_sqlite.services;

import com.faol.spring_boot_sqlite.entities.Auto;
import com.faol.spring_boot_sqlite.repository.AutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AutoServicesImpl implements AutoServicesInt{

    @Autowired
    AutoRepository autoRepository;

    @Override
    public List<Auto> getAllAutos() {
        return autoRepository.findAll();
    }

    @Override
    public Optional<Auto> getAutoById(Long id) {
        return autoRepository.findById(id);
    }

    @Override
    public void saveNewAuto(Auto auto) {
        autoRepository.save(auto);
    }

    @Override
    public Auto updateAuto(Auto auto, Long id) {
        Optional<Auto> founded = autoRepository.findById(id);

        if (founded.isPresent()){
            founded.get().setBrand(auto.getBrand());
            founded.get().setYear(auto.getYear());
            founded.get().setPrice(auto.getPrice());
            autoRepository.save(founded.get());
        }
        return founded.get();
    }

    @Override
    public void deleteAuto(Long id) {
        autoRepository.deleteById(id);
    }

    @Override
    public void deleteAllAutos() {
        autoRepository.deleteAll();
    }
}
