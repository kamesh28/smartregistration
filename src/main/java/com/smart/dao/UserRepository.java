package com.smart.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.smart.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	@Query("select u from User u where u.email =:email")  // This is JPA query and email will be same in JPA query and getUserByUsername method
	public User getUserByUserName(@Param("email") String email);
	
	
	
	

}
