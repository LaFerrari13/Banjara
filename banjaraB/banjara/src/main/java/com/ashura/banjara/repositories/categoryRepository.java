package com.ashura.banjara.repositories;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.ashura.banjara.model.Category;


@Repository
public interface categoryRepository extends JpaRepository<Category, Long>{
	List<Category> findByName(String name);
}