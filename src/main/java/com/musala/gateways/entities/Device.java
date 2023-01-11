package com.musala.gateways.entities;

import com.musala.gateways.enums.StatusEnum;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;


@ToString(exclude = {"gateway"})
@EqualsAndHashCode(exclude = {"gateway"})
@Data
@Table
@Entity
@NoArgsConstructor
public class Device implements Serializable {

    private static final long serialVersionUID = 3457243418830839516L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "UID", columnDefinition = "VARCHAR(255)")
    private UUID uid;

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
