package com.faol.spring_boot_sqlite.services;

import com.faol.spring_boot_sqlite.entities.User1;
import com.faol.spring_boot_sqlite.repository.User1Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class User1ServicesImpl implements User1ServicesInt {

    @Autowired
    User1Repository repo;

    @Override
    public List<User1> getAllUsers() {
        return repo.findAll();
    }

    @Override
    public Optional<User1> getUserById(Long id) {
        return repo.findById(id);
    }

    @Override
    public void saveNewUser(User1 user1) {
        repo.save(user1);
    }

    public User1 updateUser(User1 user1, Long id) {
        Optional<User1> foundUser = repo.findById(id);

        if (foundUser.isPresent()) {

            foundUser.get().setName(user1.getName());
            foundUser.get().setLastname(user1.getLastname());
            foundUser.get().setEmail(user1.getEmail());
            foundUser.get().setAge(user1.getAge());
            foundUser.get().setAuto(user1.getAuto());
            repo.save(foundUser.get());
        }
        return foundUser.get();
    }

    public void deleteUser(Long id) {
        repo.deleteById(id);
    }

    @Override
    public void deleteAll() {
        repo.deleteAll();
    }

}
