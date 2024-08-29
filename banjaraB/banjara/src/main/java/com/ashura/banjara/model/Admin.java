package com.ashura.banjara.model;








import org.hibernate.annotations.Type;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="admins")
@Data
public class Admin{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	


	private String email;
	
	private String password;
	
	
	private String name;
	
	
	@Basic(fetch = FetchType.LAZY)
	@Column(columnDefinition= "BYTEA")
	private byte[] img;
	
	
	
}