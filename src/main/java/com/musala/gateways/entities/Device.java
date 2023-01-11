package com.musala.gateways.entities;

import com.musala.gateways.enums.StatusEnum;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;


@ToString(exclude = {"gateway"})
@EqualsAndHashCode(exclude = {"gateway"})
@Data
@Table
@Entity
@NoArgsConstructor
public class Device implements Serializable {

    private static final long serialVersionUID = 3457243418830839516L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_DAVICE_UID")
    @SequenceGenerator(name = "SEQ_DAVICE_UID", sequenceName = "SEQ_DAVICE_UID")
    @Column(name = "UID")
    private Long uid;

    @Column(name = "VENDOR")
    private String vendor;

    @Column(name = "CREATED_AT", columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "STATUS")
    private StatusEnum status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GATEWAY_SERIAL_NUM", nullable = false)
    private Gateway gateway;
}
