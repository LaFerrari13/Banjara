package com.ashura.banjara.service;



import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ashura.banjara.model.Category;

import com.ashura.banjara.repositories.categoryRepository;


@Service
public class categoryService{
		
	@Autowired
	private categoryRepository categoryRepo;
	
	
	public List<Category> findAll(){
		return categoryRepo.findAll();
	}
	
	public Category findById(Long id) {
		return categoryRepo.findById(id).orElse(null);
	}
	
	
	public Category save(Category uno) {
		
		List<Category> check = categoryRepo.findByName(uno.getName());
		
		
		if(check.size() != 0) {
			return null;
		}
		
		System.out.println("\n\n\n\n Category not found in database, creating! \n\n\n\n\n");
			
		Category savedCategory = categoryRepo.save(uno);
		return savedCategory;
	}
	
	
	 
	
	 
	
	
	public void deleteById(Long id) {
		categoryRepo.deleteById(id);
	}
	
	public Category updateCategory(Category orig, Category new1) {
		
	

		orig.setName(new1.getName());
		orig.setParentId(new1.getParentId());
		
		
		return categoryRepo.save(orig);
	}
	
	
	
	
	
}