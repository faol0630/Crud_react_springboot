package com.faol.spring_boot_sqlite.controller;

import com.faol.spring_boot_sqlite.dto.*;
import com.faol.spring_boot_sqlite.entities.Auto;
import com.faol.spring_boot_sqlite.services.AutoServicesInt;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/auto")
public class AutoController {

    @Autowired
    AutoServicesInt service;

    AutoToAutoDTO autoToAutoDTO = new AutoToAutoDTO();

    //endpoints

    @GetMapping(value = {"/get_all"})
    public ResponseEntity<ResponseAutoDTO> getAllAutos() {

        List<Auto> autosList = service.getAllAutos();
        ResponseAutoDTO responseAutoDTO = new ResponseAutoDTO();

        if (autosList.isEmpty()) {
            responseAutoDTO.setMessage("Empty list");
            return ResponseEntity.status(HttpStatus.OK).body(responseAutoDTO);
        } else {
            responseAutoDTO.setMessage("List ok");
            responseAutoDTO.setAutosList(autosList);
            return ResponseEntity.status(HttpStatus.OK).body(responseAutoDTO);
        }

    }

    @GetMapping("/get_auto/{id}")
    public ResponseEntity<?> getAutoById(@PathVariable Long id) {

        Optional<Auto> auto = service.getAutoById(id);
        HashMap<String, Object> response = new HashMap<>();

        if (auto.isPresent()) {
            //entity to DTO:
            AutoDTO autoDTO = autoToAutoDTO.autoToAutoDTO(auto.get());

            response.put("message", "Auto found");
            response.put("auto", autoDTO); //return DTO instead of entity
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } else {
            response.put("message", "Auto not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

    }


    @PostMapping("/new_auto")
    public ResponseEntity<?> saveNewAuto(
            @Valid @RequestBody Auto requestAuto
    ) {

        Auto auto = new Auto();
        auto.setBrand(requestAuto.getBrand());
        auto.setPrice(requestAuto.getPrice());
        auto.setYear(requestAuto.getYear());

        Optional<Auto> newAuto = Optional.of(auto);
        HashMap<String, Object> response = new LinkedHashMap<>();

        if (newAuto.isPresent()) {

            service.saveNewAuto(auto);
            //entity to DTO:
            AutoDTO autoDTO = autoToAutoDTO.autoToAutoDTO(auto);

            response.put("message", "auto created");
            response.put("auto", autoDTO);
            System.out.println(response);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } else {
            response.put("message", "error creating auto");
            System.out.println(response);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

    }


    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateAuto(
            @Valid @RequestBody Auto requestAuto,
            @PathVariable Long id
    ) {
        Optional<Auto> foundAuto = service.getAutoById(id);
        HashMap<String, Object> response = new HashMap<>();

        if (foundAuto.isPresent()) {

            Auto auto = new Auto();
            auto.setBrand(requestAuto.getBrand());
            auto.setYear(requestAuto.getYear());
            auto.setPrice(requestAuto.getPrice());

            service.updateAuto(auto, id);
            //entity to DTO:
            AutoDTO autoDTO = autoToAutoDTO.autoToAutoDTO(auto);

            response.put("message", "auto updated");
            response.put("auto updated", autoDTO);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } else {
            response.put("message", "auto not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAuto(@PathVariable Long id) {

        Optional<Auto> auto = service.getAutoById(id);
        HashMap<String, Object> response = new HashMap<>();

        if (auto.isPresent()) {
            service.deleteAuto(id);
            response.put("message", "Auto deleted");
            System.out.println(auto.get().getIdAuto());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            response.put("message", "Auto not found.Nothing to delete");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }


    @DeleteMapping("/delete_all")
    public ResponseEntity<ResponseAutoDTO> deleteAll() {

        List<Auto> autosList = service.getAllAutos();
        ResponseAutoDTO response = new ResponseAutoDTO();

        if (autosList.isEmpty()) {
            response.setMessage("Empty list nothing to delete");
            response.setAutosList(autosList);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            service.deleteAllAutos();
            response.setMessage("Autos list deleted");
            response.setAutosList(autosList);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }

    }

}
