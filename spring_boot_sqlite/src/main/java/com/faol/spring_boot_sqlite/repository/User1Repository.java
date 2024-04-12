package com.faol.spring_boot_sqlite.repository;

import com.faol.spring_boot_sqlite.entities.User1;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface User1Repository extends JpaRepository<User1, Long> {
}
