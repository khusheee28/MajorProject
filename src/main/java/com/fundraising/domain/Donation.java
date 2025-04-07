package com.fundraising.domain;

import lombok.Data;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.persistence.*;
import java.math.BigInteger;
import java.time.Instant;

@Data
@Entity
@Table(name = "donations")
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "campaign_id", nullable = false)
    private Campaign campaign;
    
    @NotBlank
    @Column(nullable = false)
    private String donorAddress;
    
    @NotNull
    @Positive
    @Column(nullable = false)
    private BigInteger amount;
    
    @Column(nullable = false)
    private String transactionHash;
    
    @Column(nullable = false)
    private BigInteger timestamp;
    
    @PrePersist
    protected void onCreate() {
        timestamp = BigInteger.valueOf(Instant.now().getEpochSecond());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Campaign getCampaign() {
        return campaign;
    }

    public void setCampaign(Campaign campaign) {
        this.campaign = campaign;
    }

    public String getDonorAddress() {
        return donorAddress;
    }

    public void setDonorAddress(String donorAddress) {
        this.donorAddress = donorAddress;
    }

    public BigInteger getAmount() {
        return amount;
    }

    public void setAmount(BigInteger amount) {
        this.amount = amount;
    }
} 