package com.arbindo.mimock.entities;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@Table(name = "request_body_types")
@Getter
public class RequestBodyType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "request_body_type", nullable = false)
    @Schema(description = "Content type of the request body")
    private String requestBodyType;

    @Column(name = "created_at", nullable = false)
    @CreationTimestamp
    @Schema(description = "Creation Timestamp")
    private ZonedDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    @Schema(description = "Update Timestamp")
    private ZonedDateTime updatedAt;

    @Column(name = "deleted_at")
    @Schema(description = "Delete Timestamp")
    private ZonedDateTime deletedAt;

    @OneToMany(mappedBy = "requestBodyType")
    private Set<RequestBodiesForMock> requestBodiesForMocks = new LinkedHashSet<>();
}