package com.ashura.banjara.service;



import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ashura.banjara.model.Admin;
import com.ashura.banjara.repositories.adminRepository;


@Service
public class adminService{
		
	@Autowired
	private adminRepository adminRepo;
	
	
	public List<Admin> findAll(){
		return adminRepo.findAll();
	}
	
	public Admin findById(Long id) {
		return adminRepo.findById(id).orElse(null);
	}
	
	
	public Admin save(Admin uno) {
		
		List<Admin> check = adminRepo.findByEmail(uno.getEmail());
		
		
		if(check.size() != 0) {
			return null;
		}
		
		System.out.println("\n\n\n\n Admin not found in database, creating! \n\n\n\n\n");
		
		if(uno.getImg() == null || uno.getImg().length==0) {
			
			uno.setImg(null);
//			uno.setImg(new byte[2]);
//			System.out.println("\n\n\n image data type: " + uno.getImg().getClass() + " \n\n\n\n");
			System.out.println("\n\n\n\n image is null \n\n\n");
//			System.out.println("\n\n\n\n \n\n\n" + uno.getName());
			
			
			// THE BELOW LOGIC IS USED FOR ADDING A DEFAULT PFP FOR THE USER, BUT I HAVE CONCLUDED THAT ITS BETTER TO HANDLE THAT IN THE FRONTEND
			
			
//			try{
//				uno.setImg(getDefaultProfilePic());
//			}catch(IOException e) {
//				e.printStackTrace();
//			}
			
		}
		
		Admin savedAdmin = adminRepo.save(uno);
		return savedAdmin;
	}
	
	
	public Admin addPfp(MultipartFile img, Long id) throws IOException {
		Admin ad = this.findById(id);
		ad.setImg(img.getBytes());
		
		return adminRepo.save(ad);
	}
	
	
//	private byte[] getDefaultProfilePic() throws IOException{
//		Path path = new ClassPathResource("static/userpic.jpg").getFile().toPath();
//		return Files.readAllBytes(path);
//	}
	
	
	public void deleteById(Long id) {
		adminRepo.deleteById(id);
	}
	
	public Admin updateAdmin(Admin orig, Admin new1) {
		
		orig.setEmail(new1.getEmail());
//		orig.setImg(new1.getImg());
		orig.setName(new1.getName());
		orig.setPassword(new1.getPassword());
		
		return adminRepo.save(orig);
	}
	
	public Admin adminLogin(Admin uno){
		List<Admin> adminsWithEmail = adminRepo.findByEmail(uno.getEmail());
		Admin check = adminsWithEmail.get(0);
		
		if(check.getPassword().equals(uno.getPassword())) {
			//admin can login now
			return check;
		}
		
		return null;
	}
	
	
	
	
}