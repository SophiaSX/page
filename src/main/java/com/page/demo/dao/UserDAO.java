package com.page.demo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.page.demo.model.User;

@Mapper
public interface UserDAO {
	
	@Select("select id as id,name as name,age as age from user where id = #{id};")
	public User getOneUserById(@Param("id")Integer id);
	
	@Select("select id as id,name as name,age as age from user limit #{start},#{pageSize};")
	public List<User> getUserList(@Param("start")Integer start,@Param("pageSize")Integer pageSize);
	
	@Select("select count(*) from user;")
	public Integer getUserCount();
}
