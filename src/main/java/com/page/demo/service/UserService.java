package com.page.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.page.demo.dao.UserDAO;
import com.page.demo.model.User;

@Service
public class UserService {
	
	@Autowired
	private UserDAO userDAO;
	
	public User getOneUserById(Integer id){
		return userDAO.getOneUserById(id);
	}
	
	public List<User> getUserList(Integer start,Integer pageSize){
		return userDAO.getUserList(start, pageSize);
	}
	
	public Integer getUserCount(){
		return userDAO.getUserCount();
	}
}
