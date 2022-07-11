package com.arbindo.mimock.manage.mimocks.service;


import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.models.request.ProcessedMockRequest;
import com.arbindo.mimock.manage.mimocks.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MockManagementService {
    List<Mock> getAllMocks();

    Page<Mock> getMocksAsPageable(Pageable pageable, Status status, String httpMethod, String expectedResponseType);

    Mock getMockById(String mockId);

    boolean hardDeleteMockById(String mockId);

    boolean softDeleteMockById(String mockId);

    boolean deleteAllMocks();

    void flushDeletedMocks();

    Mock createMock(ProcessedMockRequest request);

    Mock updateMock(String mockId, ProcessedMockRequest request);
}
