package com.ashura.banjara.repositories;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ashura.banjara.model.Admin;


@Repository
public interface adminRepository extends JpaRepository<Admin, Long>{
	List<Admin> findByEmail(String email);
}