package com.musala.gateways.entities;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@ToString(exclude = {"deviceList"})
@EqualsAndHashCode(exclude = {"deviceList"})
@Data
@Entity
@Table
@NoArgsConstructor
public class Gateway implements Serializable {

    private static final long serialVersionUID = 578476480025144544L;

    @Id
    @Column(name = "SERIAL_NUMBER")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_GATEWAY_SERIAL_NUM")
    @SequenceGenerator(name = "SEQ_GATEWAY_SERIAL_NUM", sequenceName = "SEQ_GATEWAY_SERIAL_NUM")
    private Long serialNumber;

    @NonNull
    @Column(name = "NAME")
    private String name;

    @NonNull
    @Column(name = "IP_ADDRESS")
    private String ipAddress;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "gateway", cascade = CascadeType.ALL)
    private List<Device> deviceList = new ArrayList<>();
}
