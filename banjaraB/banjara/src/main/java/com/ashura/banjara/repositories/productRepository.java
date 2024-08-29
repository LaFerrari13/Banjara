package com.ashura.banjara.repositories;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ashura.banjara.model.Category;
import com.ashura.banjara.model.Product;


@Repository
public interface productRepository extends JpaRepository<Product, Long>{
	List<Product> findByCategory(Category cat);
}