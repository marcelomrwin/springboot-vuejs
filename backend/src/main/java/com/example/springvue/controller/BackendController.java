package com.example.springvue.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.springvue.domain.User;
import com.example.springvue.repository.UserRepository;

@RestController()
@RequestMapping("/api")
public class BackendController {
	private static final Logger LOG = LoggerFactory.getLogger(BackendController.class);

	public static final String HELLO_TEXT = "Hello from Spring Boot Backend!";

	private UserRepository userRepository;

	@Autowired
	public BackendController(UserRepository repository) {
		this.userRepository = repository;
	}

	@RequestMapping(path = "/hello")
	public @ResponseBody String sayHello() {
		LOG.info("GET called on /hello resource");
		return HELLO_TEXT;
	}

	@RequestMapping(path = "/user", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public @ResponseBody long addNewUser(@RequestParam String firstName, @RequestParam String lastName) {
		User user = new User(firstName, lastName);
		userRepository.save(user);

		LOG.info(user.toString() + " successfully saved into DB");

		return user.getId();
	}

	@GetMapping(path = "/user/{id}")
	public @ResponseBody User getUserById(@PathVariable("id") long id) {
		LOG.info("Reading user with id " + id + " from database.");
		return userRepository.findById(id).get();
	}
}
