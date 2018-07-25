package com.page.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.page.demo.bean.ResObj;
import com.page.demo.model.User;
import com.page.demo.service.UserService;

@Controller
@RequestMapping("user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@ResponseBody
	@RequestMapping(value = "/getOneUser",method = RequestMethod.POST)
	public ResObj getOneUser(Integer id){
		ResObj resObj = new ResObj();
		User user = userService.getOneUserById(id);
		resObj.setResult(200);
		resObj.setObj(user);
		return resObj;
	}
	
	@ResponseBody
	@RequestMapping(value = "/userList/{currentPage}",method = RequestMethod.GET)
	public ResObj getUserList(@PathVariable("currentPage")Integer currentPage){
		ResObj resObj = new ResObj();
		Integer pageSize = 10;
		Integer totalCount = userService.getUserCount();
		Integer totalPage = totalCount % pageSize == 0 ? totalCount / pageSize : totalCount / pageSize + 1;
		Integer start = (currentPage-1)*pageSize;
		List<User> list = userService.getUserList(start, pageSize);
		resObj.setResult(200);
		resObj.setList(list);
		resObj.setTotalCount(totalCount);
		resObj.setTotalPage(totalPage);
		return resObj;
	}
}
