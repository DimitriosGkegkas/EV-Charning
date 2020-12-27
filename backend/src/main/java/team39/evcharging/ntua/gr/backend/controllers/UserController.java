package team39.evcharging.ntua.gr.backend.controllers;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import team39.evcharging.ntua.gr.backend.models.User;
import team39.evcharging.ntua.gr.backend.models.UserRepository;

@RestController
public class UserController {
    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin(origins = "https://localhost:8765/evcharge/api")
    @GetMapping("/users")
    List<User> all() {
      return repository.findAll();
    }

    @CrossOrigin(origins = "https://localhost:8765/evcharge/api")
    @PostMapping("/users")
    User create(@RequestBody User newUser) {
      return repository.save(newUser);
    }





    
}
