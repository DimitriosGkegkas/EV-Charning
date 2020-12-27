package team39.evcharging.ntua.gr.backend.models;


import javax.persistence.Entity;



@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    
}
