package com.ashura.banjara.controller;

import java.io.IOException;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ashura.banjara.model.Admin;
import com.ashura.banjara.model.Category;
import com.ashura.banjara.model.Product;
import com.ashura.banjara.service.adminService;
import com.ashura.banjara.service.categoryService;
import com.ashura.banjara.service.productService;

@RestController
@RequestMapping("/api/banjara")
public class banjaraController{
	
	
	@Autowired
	private productService productServ;
	
	@Autowired
	private adminService adminServ;
	
	@Autowired
	private categoryService cateServ;
	
	
	
	
	
	@GetMapping("/products")
	public ResponseEntity<List<Product>> getAllProducts(){
		List<Product> products = productServ.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(products);
	}
	
	
	@GetMapping("/products/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable("id") long id) throws IOException{
		Product pd = productServ.findById(id);
		return ResponseEntity.status(HttpStatus.OK).body(pd);
	}
	
	
	
	@PostMapping("/products")
	public ResponseEntity<Product> saveProduct(@RequestBody Product pd){
		Product savedProduct = productServ.save(pd);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
	}
	
	@PostMapping("/products/img/{id}")
	public ResponseEntity<Product> saveProductImg(@PathVariable("id") long id, @RequestParam MultipartFile img) throws IOException{
		Product pd = productServ.addImg(id, img);
		return ResponseEntity.status(HttpStatus.OK).body(pd);
	}
	
	@GetMapping("/products/img/{id}")
	public ResponseEntity<byte[]> getProductImage(@PathVariable("id") long id){
		Product pd = productServ.findById(id);
		return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.IMAGE_JPEG).body(pd.getImg());
	}
	
	
	
	@DeleteMapping("/products/{id}")
	public ResponseEntity<HttpStatus> deleteProduct(@PathVariable("id") long id){
		try {
			productServ.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@PutMapping("/products/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable("id") long id, @RequestBody Product new1){
		Product orig = productServ.findById(id);
		
		Product updatedProduct = productServ.updateProduct(orig, new1);
		
		return ResponseEntity.status(HttpStatus.OK).body(updatedProduct);
	}
	
	
	
	
	//below are some api's regarding admin creation and login
	//it is imperative that you find a better and recommended way to do this
	//and even make changes in the adminService class
	
	
	
	
	@GetMapping("/admins")
	public ResponseEntity<List<Admin>> getAllAdmins(){
		List<Admin> allAdmins = adminServ.findAll();
		
		return ResponseEntity.status(HttpStatus.OK).body(allAdmins);
	}
	
	
	
	// the code below for creating an admin is based on the assumption that admin will
	// always be created in the first place WITHOUT a profile pic, although in this case it will be 
	// assigned a defualt profile pic, ideally in the frontend to save costs
	// this will require an additional endpoint to add a profile pic for a user
	
	
	@PostMapping("/admins")
	public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin){
		
		
		
		
		
		/*
		 * Admin admin = new Admin();
		 * 
		 * admin.setEmail(email); admin.setPassword(password); admin.setName(name);
		 */
		
		
		
		
		Admin savedAdmin = adminServ.save(admin);
		
		if(savedAdmin == null) {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(savedAdmin);
	}
	
	
	@PostMapping("/admins/pfp/{id}")
	public ResponseEntity<Admin> uploadImage(@PathVariable("id") long id, @RequestParam("img") MultipartFile img) throws IOException{
		
		//if you're not making sure that the user is created or even logged in to trigger this, to add a pfp, in the frontend
		// then you need to add a check here or in the adminServ.addpfp method
		
		
		System.out.println("Request received!");
		Admin savedPfp =  adminServ.addPfp(img, id);
		return ResponseEntity.status(HttpStatus.OK).body(savedPfp);
		
	}
	
	
	
	
	
	
	
	
	
	/*
	 * @PostMapping("/uploadImage") public Admin uploadImage(@RequestParam Long
	 * adminId, @RequestParam MultipartFile img) throws IOException {
	 * Optional<Admin> adminOpt = adminRepository.findById(adminId); if
	 * (!adminOpt.isPresent()) { throw new
	 * ResponseStatusException(HttpStatus.NOT_FOUND, "Admin not found"); }
	 * 
	 * Admin admin = adminOpt.get(); admin.setImg(img.getBytes()); return
	 * adminRepository.save(admin); }
	 */

	
	@PostMapping("/admins/login")
	public ResponseEntity<Admin> adminLogin(@RequestBody Admin admin){
		
		Admin login = adminServ.adminLogin(admin);
		if(login == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(login);
		
	}
	
	
	@GetMapping("/admins/pfp/{id}")
	public ResponseEntity<byte[]> getPfp(@PathVariable("id") long id){
		Admin admin = adminServ.findById(id);
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(admin.getImg());
	}
	
	
	@GetMapping("/category")
	public ResponseEntity<List<Category>> getAllCategories(){
		
		List<Category> cates = cateServ.findAll();
		
		return ResponseEntity.status(HttpStatus.OK).body(cates);
		
	}
	
	
	@PostMapping("/category")
	public ResponseEntity<Category> saveCategory(@RequestBody Category cat){
		Category cate = cateServ.save(cat);
		return ResponseEntity.status(HttpStatus.OK).body(cate);
	}
	
	
	@GetMapping("/products/category/{id}")
	public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable("id") long catId){
		
		List<Product> prods =  productServ.getProductByCategory(catId);
		
		return ResponseEntity.status(HttpStatus.OK).body(prods);
		
	}
	
	
	
	
	
}