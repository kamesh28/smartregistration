package com.smart.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.smart.entities.Contact;

public interface ContactRepository extends JpaRepository<Contact, Integer> {
	
	//pagination.....
	@Query("from Contact as c where c.user.id =:userId")
		//public List<Contact> findContactsByUser(@Param("userId") int userId); // It is used for show contacts below change the code for pagination
    //current page - page
	//contact per page - 5 [n]
	
	public Page<Contact> findContactByUser(@Param("userId") int userId, Pageable pePageable);

}