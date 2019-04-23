package com.example.springvue;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class SpringVueWarApplication extends SpringBootServletInitializer {

private static Class<SpringVueWarApplication> applicationClass = SpringVueWarApplication.class;

	public static void main(String[] args) {
		SpringApplication.run(SpringVueApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(applicationClass);
	}

}
