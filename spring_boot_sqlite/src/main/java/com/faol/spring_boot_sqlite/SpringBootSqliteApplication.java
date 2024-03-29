package com.faol.spring_boot_sqlite;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootSqliteApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootSqliteApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Successful start CRUD-SQLite");
	}
}
