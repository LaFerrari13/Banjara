package com.ashura.banjara.service;



import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ashura.banjara.model.Category;
import com.ashura.banjara.model.Product;
import com.ashura.banjara.repositories.productRepository;


@Service
public class productService{
		
	@Autowired
	private productRepository productRepo;
	
	
	public List<Product> findAll(){
		return productRepo.findAll();
	}
	
	public Product findById(Long id) {
		return productRepo.findById(id).orElse(null);
	}
	
	
	public Product save(Product uno) {
		
		System.out.println("\n\n\n\n Image: " + uno.getImg() + "\n\n\n");
		Product savedProduct = productRepo.save(uno);
		return savedProduct;
	}
	
	
	public Product addImg(long id, MultipartFile img) throws IOException {
		Product pd = productRepo.findById(id).orElse(null);
		if(pd == null) {
			return null;
		}
		
		pd.setImg(img.getBytes());
		
		return productRepo.save(pd);
		
	}
	
	public void deleteById(Long id) {
		productRepo.deleteById(id);
	}
	
	public Product updateProduct(Product orig, Product new1) {
		orig.setName(new1.getName());
		orig.setCategory(new1.getCategory());
		orig.setPrice(new1.getPrice());
		
		return productRepo.save(orig);
	}
	
	public List<Product> getProductByCategory(long catId){
		
		Category cat = new Category();
		cat.setId(catId);
		
		return productRepo.findByCategory(cat);
	}
	
	
}