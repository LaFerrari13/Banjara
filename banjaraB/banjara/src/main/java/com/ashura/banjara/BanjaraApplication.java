package com.ashura.banjara;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class BanjaraApplication {

	public static void main(String[] args) {
		SpringApplication.run(BanjaraApplication.class, args);
	}

}
