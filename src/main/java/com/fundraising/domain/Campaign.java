package com.fundraising.domain;

import lombok.Data;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.persistence.*;
import java.math.BigInteger;
import java.time.Instant;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "campaigns")
@Data
public class Campaign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(nullable = false)
    private String title;
    
    @NotBlank
    @Column(length = 1000)
    private String description;
    
    @NotNull
    @Positive
    @Column(nullable = false)
    private BigInteger targetAmount;
    
    @NotNull
    @Column(nullable = false)
    private BigInteger currentAmount = BigInteger.ZERO;
    
    @Column(nullable = false)
    private BigInteger startDate;
    
    @Column(nullable = false)
    private BigInteger endDate;
    
    @Column(unique = true, nullable = false)
    private String contractAddress;
    
    @Column(nullable = false)
    private boolean active = true;
    
    @NotBlank
    @Column(nullable = false)
    private String status;
    
    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL)
    private List<Donation> donations;
    
    @PrePersist
    protected void onCreate() {
        startDate = BigInteger.valueOf(Instant.now().getEpochSecond());
    }
} 