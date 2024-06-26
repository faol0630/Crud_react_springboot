package com.faol.spring_boot_sqlite.controller;


import com.faol.spring_boot_sqlite.dto.ResponseDTO;
import com.faol.spring_boot_sqlite.dto.User1DTO;
import com.faol.spring_boot_sqlite.dto.User1ToUser1DTO;
import com.faol.spring_boot_sqlite.entities.User1;
import com.faol.spring_boot_sqlite.services.User1ServicesInt;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/user1")
//@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "*") //direccion de react
public class User1Controller {

    @Autowired
    User1ServicesInt service;

    User1ToUser1DTO user1ToUser1DTO = new User1ToUser1DTO();

    @GetMapping(value = {"/get_all"})
    public ResponseEntity<ResponseDTO> getAllUsers() {

        List<User1> userList = service.getAllUsers();
        //HashMap<String, Object> result = new HashMap<>();
        ResponseDTO responseDTO = new ResponseDTO();

        if (userList.isEmpty()) {
            //result.put("message", "Empty list");
            responseDTO.setMessage("Empty list");
            return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
        } else {
            //result.put("message", "List ok");
            //result.put("usersList", userList);
            responseDTO.setMessage("List ok");
            responseDTO.setUsersList(userList);
            return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
        }

    }

    @GetMapping("/get_user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {

        Optional<User1> user1 = service.getUserById(id);
        HashMap<String, Object> response = new HashMap<>();

        if (user1.isPresent()) {
            //entity to DTO:
            User1DTO user1DTO = user1ToUser1DTO.user1ToUser1DTO(user1.get());

            response.put("message", "User found");
            response.put("user", user1DTO); //return DTO instead of entity
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } else {
            response.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

    }

    @PostMapping("/new_user")
    public ResponseEntity<?> saveNewUser(
            @Valid @RequestBody User1 requestUser
    ) {

        Optional<User1> newUser = Optional.of(requestUser);
        HashMap<String, Object> response = new LinkedHashMap<>();

        if (newUser.isPresent()) {

            service.saveNewUser(requestUser);
            //entity to DTO:
            User1DTO user1DTO = user1ToUser1DTO.user1ToUser1DTO(requestUser);

            response.put("message", "user created");
            response.put("user1", user1DTO);
            System.out.println(response);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } else {
            response.put("message", "error creating user");
            System.out.println(response);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(
            @Valid @RequestBody User1 requestUser,
            @PathVariable Long id
    ) {
        Optional<User1> foundUser = service.getUserById(id);
        HashMap<String, Object> response = new HashMap<>();

        if (foundUser.isPresent()) {

            User1 user1 = new User1();
            user1.setName(requestUser.getName());
            user1.setLastname(requestUser.getLastname());
            user1.setEmail(requestUser.getEmail());
            user1.setAge(requestUser.getAge());
            user1.setAuto(requestUser.getAuto());

            service.updateUser(user1, id);
            //entity to DTO:
            User1DTO user1DTO = user1ToUser1DTO.user1ToUser1DTO(user1);

            response.put("message", "user updated");
            response.put("user updated", user1DTO);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } else {
            response.put("message", "user not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {

        Optional<User1> user1 = service.getUserById(id);
        HashMap<String, Object> response = new HashMap<>();

        if (user1.isPresent()) {
            service.deleteUser(id);
            response.put("message", "User deleted");
            System.out.println(user1.get().getId());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            response.put("message", "User not found.Nothing to delete");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @DeleteMapping("/delete_all")
    public ResponseEntity<ResponseDTO> deleteAll() {

        List<User1> userList = service.getAllUsers();
        //HashMap<String, Object> response = new HashMap<>();
        ResponseDTO response = new ResponseDTO();

        if (userList.isEmpty()) {
            //response.put("message", "Empty list nothing to delete");
            //response.put("user's list", userList);
            response.setMessage("Empty list nothing to delete");
            response.setUsersList(userList);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            service.deleteAll();
            //response.put("message", "Users list deleted");
            //response.put("user's list", userList);
            response.setMessage("Users list deleted");
            response.setUsersList(userList);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }

    }
}
