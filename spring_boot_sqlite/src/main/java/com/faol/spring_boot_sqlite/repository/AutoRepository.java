package com.faol.spring_boot_sqlite.repository;

import com.faol.spring_boot_sqlite.entities.Auto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AutoRepository extends JpaRepository<Auto, Long> {
}
