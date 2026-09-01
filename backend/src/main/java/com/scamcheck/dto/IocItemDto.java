package com.scamcheck.dto;

public class IocItemDto {
    private String type; // URL, EMAIL, IPV4, SHA256
    private String value;
    private String status; // SUSPICIOUS, CLEAN, UNKNOWN
    private String detail;

    public IocItemDto() {}

    public IocItemDto(String type, String value, String status, String detail) {
        this.type = type;
        this.value = value;
        this.status = status;
        this.detail = detail;
    }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getDetail() { return detail; }
    public void setDetail(String detail) { this.detail = detail; }
}
