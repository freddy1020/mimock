package com.arbindo.mimock.manage.mimocks.models.v1;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Getter
@Setter
@Builder
public class ProcessedMockRequest {
    private String route;
    private String httpMethod;
    private int statusCode;
    private String responseContentType;
    private String queryParams;
    private String name;
    private String description;
    private Map<String, Object> requestHeader;
    private Boolean shouldDoExactHeaderMatching;
    private Map<String, Object> requestBody;
    private String requestBodyType;
    private Map<String, Object> responseHeaders;
    private String expectedTextResponse;
    private MultipartFile binaryFile;
}
