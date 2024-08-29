package com.ashura.banjara.model;








import org.hibernate.annotations.Type;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="category")
@Data
public class Category{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="parentId")
	private Long parentId;
	
	
	
	
	
	
	
	
}