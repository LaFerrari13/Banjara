package com.ashura.banjara.model;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="products")
@Data
public class Product{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="name")
	private String name;
	
	
	
	@Column(name="price")
	private float price;
	
	@ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
	
	@Basic(fetch = FetchType.LAZY)
	@Column(columnDefinition= "BYTEA")
	private byte[] img;
	
	
}