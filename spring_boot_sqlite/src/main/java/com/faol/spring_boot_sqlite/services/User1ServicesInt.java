package com.faol.spring_boot_sqlite.services;

import com.faol.spring_boot_sqlite.entities.User1;

import java.util.List;
import java.util.Optional;

public interface User1ServicesInt {

    List<User1> getAllUsers();
    Optional<User1> getUserById(Long id);
    void saveNewUser(User1 user1);
    User1 updateUser(User1 user1, Long id);
    void deleteUser(Long id);
    void deleteAll();
}
